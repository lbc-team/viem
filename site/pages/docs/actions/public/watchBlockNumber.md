---
description: 监视并返回传入的区块号。
---

# watchBlockNumber

监视并返回传入的区块号。

## 用法

通过你的公共客户端传递一个监听器。

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const unwatch = publicClient.watchBlockNumber( // [!code focus:99]
  { onBlockNumber: blockNumber => console.log(blockNumber) }
)
// @log: > 69420n
// @log: > 69421n
// @log: > 69422n
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

## 监听器

`(blockNumber: bigint) => void`

区块号。

## 返回值

`UnwatchFn`

一个可以调用的函数，用于停止监视新的区块号。

## 参数

### emitMissed (可选)

- **类型:** `boolean`
- **默认值:** `false`

是否将错过的区块号发送到回调。

错过的区块号可能发生在互联网连接丢失或区块时间小于客户端的 [轮询间隔](/docs/clients/public#pollinginterval-optional) 的情况下。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlockNumber(
  { 
    emitMissed: true, // [!code focus]
    onBlockNumber: blockNumber => console.log(blockNumber),
  }
)
```

### emitOnBegin (可选)

- **类型:** `boolean`
- **默认值:** `false`

当订阅打开时，是否将最新的区块号发送到回调。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlockNumber(
  { 
    emitOnBegin: true, // [!code focus]
    onBlockNumber: blockNumber => console.log(blockNumber),
  }
)
```

### poll (可选)

- **类型:** `boolean`
- **默认值:** 对于 WebSocket 传输为 `false`，对于非 WebSocket 传输为 `true`

是否使用轮询机制检查新的区块号，而不是使用 WebSocket 订阅。

此选项仅适用于具有 [WebSocket 传输](/docs/clients/transports/websocket) 的客户端。

```ts twoslash
import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: webSocket()
})

const unwatch = publicClient.watchBlockNumber(
  { 
    onBlockNumber: blockNumber => console.log(blockNumber),
    poll: true, // [!code focus]
  }
)
```

### pollingInterval (可选)

- **类型:** `number`

轮询频率（以毫秒为单位）。默认为客户端的 `pollingInterval` 配置。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlockNumber(
  { 
    onBlockNumber: blockNumber => console.log(blockNumber),
    pollingInterval: 12_000, // [!code focus]
  }
)
```

## 示例

查看 `watchBlockNumber` 在实时 [监视区块号示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

- 当 `poll: true` 时，在轮询间隔上调用 [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)。
- 当 `poll: false` 且使用 WebSocket 传输时，通过 [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) 和 `"newHeads"` 事件使用 WebSocket 订阅。