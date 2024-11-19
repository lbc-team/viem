---
description: 返回自交易在区块上处理以来经过的区块数（确认数）。
---

# getTransactionConfirmations

返回自交易在区块上处理以来经过的区块数（确认数）。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const transactionReceipt = await publicClient.getTransactionReceipt({ hash: '...' })
const confirmations = await publicClient.getTransactionConfirmations({  // [!code focus:99]
  transactionReceipt
})
// 15n
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

你也可以通过交易哈希获取确认数：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const confirmations = await publicClient.getTransactionConfirmations({  // [!code focus:99]
  hash: '0x...'
})
// @log: 15n
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

## 返回值

`bigint`

自交易被处理以来经过的区块数。如果确认数为 `0`，则交易尚未被确认和处理。

## 参数

### transactionReceipt

- **类型:** [`TransactionReceipt`](/docs/glossary/types#transactionreceipt)

交易收据。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
// @noErrors
const balance = await publicClient.getTransactionConfirmations({
  transactionReceipt: { ... }, // [!code focus]
})
```

### hash

- **类型:** [`Hash`](/docs/glossary/types#hash)

交易的哈希。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const balance = await publicClient.getTransactionConfirmations({
  hash: '0x...'  // [!code focus]
})
```

## 示例

查看 `getTransactionConfirmations` 在实时 [获取交易示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

[`eth_getTransactionConfirmations`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionConfirmations)