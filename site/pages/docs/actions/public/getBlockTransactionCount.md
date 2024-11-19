---
description: 返回指定区块号、哈希或标签的交易数量。
---

# getBlockTransactionCount

返回指定区块号、哈希或标签的交易数量。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const count = await publicClient.getBlockTransactionCount() // [!code focus:99]
// @log: 输出: 23
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

`number`

区块交易数量。

## 参数

### blockHash (可选)

- **类型:** [`Hash`](/docs/glossary/types#hash)

在给定区块哈希下的计数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const count = await publicClient.getBlockTransactionCount({
  blockHash: '0x89644bbd5c8d682a2e9611170e6c1f02573d866d286f006cbf517eec7254ec2d' // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `bigint`

在给定区块号下的计数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlockTransactionCount({
  blockNumber: 42069n // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

在给定区块标签下的计数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlockTransactionCount({
  blockTag: 'safe' // [!code focus]
})
```

## JSON-RPC 方法

- 对于 `blockNumber` 和 `blockTag` 调用 [`eth_getBlockTransactionCountByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber)。
- 对于 `blockHash` 调用 [`eth_getBlockTransactionCountByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash)。