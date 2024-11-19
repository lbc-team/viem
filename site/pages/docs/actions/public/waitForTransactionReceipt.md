---
description: 检索给定交易哈希的交易收据。
---

# waitForTransactionReceipt

等待 [Transaction](/docs/glossary/terms#transaction) 被包含在 [Block](/docs/glossary/terms#block) 中（一个确认），然后返回 [Transaction Receipt](/docs/glossary/terms#transaction-receipt)。

`waitForTransactionReceipt` 操作还支持替换检测（例如，加速交易）。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const transaction = await publicClient.waitForTransactionReceipt( // [!code focus:99]
  { hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' }
)
// @log: {
// @log:  blockHash: '0xaf1dadb8a98f1282e8f7b42cc3da8847bfa2cf4e227b8220403ae642e1173088',
// @log:  blockNumber: 15132008n,
// @log:  from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
// @log:  ...
// @log:  status: 'success',
// @log: }
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## 返回

[`TransactionReceipt`](/docs/glossary/types#transactionreceipt)

交易收据。

## 参数

### confirmations (可选)

- **类型:** `number`
- **默认:** `1`

在解析之前等待的确认数量（已通过的区块数）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.waitForTransactionReceipt(
  { 
    confirmations: 5, // [!code focus:1]
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' 
  }
)
```

### onReplaced (可选)

- **类型:** `({ reason: 'replaced' | 'repriced' | 'cancelled', replacedTransaction: Transaction, transaction: Transaction, transactionReceipt: TransactionReceipt }) => void`

如果交易被替换，发出的可选回调。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.waitForTransactionReceipt(
  { 
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    onReplaced: replacement => console.log(replacement) // [!code focus:1]
  }
)
```

### pollingInterval (可选)

- **类型:** `number`

轮询频率（以毫秒为单位）。默认为客户端的 `pollingInterval` 配置。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.waitForTransactionReceipt(
  { 
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    pollingInterval: 12_000, // [!code focus:1]
  }
)
```

### retryCount (可选)

- **类型:** `number`
- **默认:** `6`

如果未找到交易或区块，则重试的次数。

```ts
const transaction = await publicClient.waitForTransactionReceipt(
  { 
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    retryCount: 3, // [!code focus:1]
  }
)
```

### retryDelay (可选)

- **类型:** `number | (({ count: number; error: Error }) => number)`
- **默认:** `({ count }) => ~~(1 << count) * 200`（指数退避）

重试之间等待的时间（以毫秒为单位）。

```ts
const transaction = await publicClient.waitForTransactionReceipt(
  { 
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    retryDelay: 10_000, // [!code focus:1]
  }
)
```

### timeout (可选)

- **类型:** `number`
- **默认:** `180_000`

在停止轮询之前等待的可选超时（以毫秒为单位）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.waitForTransactionReceipt(
  { 
    hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
    timeout: 60_000, // [!code focus:1]
  }
)
```

### 注意事项

- 当用户在其钱包中修改交易（以加速或取消）时，交易可能会被替换。当从相同的 nonce 发送时，交易会被替换。
- 交易替换的原因有 3 种类型：
  - `repriced`：燃气价格已被修改（即不同的 `maxFeePerGas`）
  - `cancelled`：交易已被取消（即 `value === 0n`）
  - `replaced`：交易已被替换（即不同的 `value` 或 `data`）

## 实时示例

查看 `waitForTransactionReceipt` 在实时 [发送交易示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>


## JSON-RPC 方法

- 在每个区块上轮询 [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt)，直到它被处理。
- 如果交易被替换：
  - 调用 [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber) 并提取交易
  - 检查其中一个交易是否为替换
  - 如果是，调用 [`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt)。