---
description: 返回给定哈希或区块标识符的交易信息。
---

# getTransaction

返回给定哈希或区块标识符的 [Transaction](/docs/glossary/terms#transaction) 信息。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const transaction = await publicClient.getTransaction({ // [!code focus:99]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
})
// @log: {
// @log:  blockHash: '0xaf1dadb8a98f1282e8f7b42cc3da8847bfa2cf4e227b8220403ae642e1173088',
// @log:  blockNumber: 15132008n,
// @log:  from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
// @log:  ...
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

[`Transaction`](/docs/glossary/types#transaction)

交易信息。

## 参数

### hash (可选)

- **类型:** `'0x${string}'`

根据交易哈希获取交易信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.getTransaction({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```

### blockHash (可选)

- **类型:** `'0x${string}'`

根据区块哈希（和索引）获取交易信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.getTransaction({
  blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d', // [!code focus:2]
  index: 0
})
```

### blockNumber (可选)

- **类型:** `'0x${string}'`

根据区块编号（和索引）获取交易信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.getTransaction({
  blockNumber: 69420n, // [!code focus:2]
  index: 0
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

根据区块标签（和索引）获取交易信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.getTransaction({
  blockTag: 'safe', // [!code focus:2]
  index: 0
})
```

### index (可选)

- **类型:** `number`

与区块标识符（编号、哈希或标签）一起使用的索引。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.getTransaction({
  blockTag: 'safe',
  index: 0 // [!code focus]
})
```

## 示例

查看 `getTransaction` 在实时 [获取交易示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

[`eth_getTransactionByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionByHash)