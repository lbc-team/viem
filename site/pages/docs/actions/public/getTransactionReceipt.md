---
description: 返回给定交易哈希的交易收据。
---

# getTransactionReceipt

返回给定的 [交易收据](/docs/glossary/terms#transaction-receipt) 的 [交易](/docs/glossary/terms#transaction) 哈希。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const transaction = await publicClient.getTransactionReceipt({ // [!code focus:99]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
})
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

### hash

- **类型:** `'0x${string}'`

一个交易哈希。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transaction = await publicClient.getTransactionReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```

## 示例

查看 `getTransactionReceipt` 在实时 [获取交易示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_fetching-transactions?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

[`eth_getTransactionReceipt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getTransactionReceipt)