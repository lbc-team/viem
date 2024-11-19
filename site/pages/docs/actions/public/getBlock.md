---
description: 返回关于区块号、哈希或标签的区块信息。
---

# getBlock

返回关于区块号、哈希或标签的区块信息。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const block = await publicClient.getBlock() // [!code focus:99]
// @log: 输出: {
// @log:  baseFeePerGas: 10789405161n,
// @log:  difficulty: 11569232145203128n,
// @log:  extraData: '0x75732d656173742d38',
// @log:  ...
// @log: }
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/publicClient.ts]
```

:::

## 返回

[`Block`](/docs/glossary/types#block)

关于区块的信息。

## 参数

### blockHash (可选)

- **类型:** [`Hash`](/docs/glossary/types#hash)

给定区块哈希的信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlock({
  blockHash: '0x89644bbd5c8d682a2e9611170e6c1f02573d866d286f006cbf517eec7254ec2d' // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `bigint`

给定区块号的信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlock({
  blockNumber: 42069n // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

给定区块标签的信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlock({
  blockTag: 'safe' // [!code focus]
})
```

### includeTransactions (可选)

- **类型:** `boolean`

是否包含交易（作为结构化的 `Transaction` 对象数组）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlock({
  includeTransactions: true // [!code focus]
})
```

## 示例

查看 `getBlock` 在实时 [获取区块示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

- 对于 `blockNumber` 和 `blockTag` 调用 [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber)。
- 对于 `blockHash` 调用 [`eth_getBlockByHash`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash)。