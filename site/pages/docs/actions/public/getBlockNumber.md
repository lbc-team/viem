---
description: 返回最近看到的区块编号。
---

# getBlockNumber

返回最近看到的区块编号。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const blockNumber = await publicClient.getBlockNumber() // [!code focus:99]
// @log: 输出: 69420n
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/publicClient.ts]
```

:::

## 返回

`bigint`

区块的编号。

## 参数

### cacheTime (可选)

- **类型:** `number`
- **默认:** [客户端的 `cacheTime`](/docs/clients/public#cachetime-optional)

缓存的区块编号在内存中保持的时间（以毫秒为单位）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const block = await publicClient.getBlockNumber({
  cacheTime: 4_000 // [!code focus]
})
```

默认情况下，区块编号会在 [客户端的 `cacheTime`](/docs/clients/public#cacheTime-optional) 期间被缓存。

- 设置大于零的值将使区块编号在缓存中保持该时间。
- 设置值为 `0` 将禁用缓存，并始终检索最新的区块编号。

## 示例

查看在实时 [获取区块示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks) 中 `getBlockNumber` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_fetching-blocks?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

[`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)