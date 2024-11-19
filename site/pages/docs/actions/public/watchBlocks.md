---
description: 监视并返回传入区块的信息。
---

# watchBlocks

监视并返回传入区块的信息。

## 用法

通过你的公共客户端传递一个监听器。

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const unwatch = publicClient.watchBlocks( // [!code focus:99]
  { onBlock: block => console.log(block) }
)
// @log: > {
// @log:  baseFeePerGas: 10789405161n,
// @log:  difficulty: 11569232145203128n,
// @log:  extraData: '0x75732d656173742d38',
// @log:  ...
// @log: }

// @log: > {
// @log:  baseFeePerGas: 12394051511n,
// @log:  difficulty: 11512315412421123n,
// @log:  extraData: '0x5123ab1512dd14aa',
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

`UnwatchFn`

一个可以调用的函数，用于停止监视新块。

## 参数

### onBlock

- **类型:** `(block: Block) => void`

区块信息。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlocks(
  { onBlock: block => console.log(block) } // [!code focus:1]
)
```

### onError (可选)

- **类型:** `(error: Error) => void`

获取区块时抛出的错误。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlocks(
  { 
    onBlock: block => console.log(block),
    onError: error => console.log(error) // [!code focus:1]
  }
)
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

在给定标签上监视新块。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlocks(
  { 
    blockTag: 'safe',
    onBlock: block => console.log(block), // [!code focus]
  }
)
```

### emitMissed (可选)

- **类型:** `boolean`
- **默认:** `false`

是否向回调发出错过的块。

错过的块可能发生在互联网连接丢失或区块时间小于客户端的 [轮询间隔](/docs/clients/public#pollinginterval-optional) 的情况下。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlocks(
  { 
    emitMissed: true, // [!code focus]
    onBlock: block => console.log(block),
  }
)
```

### emitOnBegin (可选)

- **类型:** `boolean`
- **默认:** `false`

当订阅打开时，是否向回调发出区块。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlocks(
  { 
    emitOnBegin: true, // [!code focus]
    onBlock: block => console.log(block),
  }
)
```

### includeTransactions (可选)

- **类型:** `boolean`

是否包括交易（作为结构化的 `Transaction` 对象数组）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchBlocks(
  { 
    includeTransactions: true,  // [!code focus]
    onBlock: block => console.log(block),
  }
)
```

### poll (可选)

- **类型:** `boolean`
- **默认:** 对于 WebSocket 客户端为 `false`，对于非 WebSocket 客户端为 `true`

是否使用轮询机制检查新块，而不是 WebSocket 订阅。

此选项仅适用于具有 [WebSocket 传输](/docs/clients/transports/websocket) 的客户端。

```ts twoslash
import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: webSocket()
})

const unwatch = publicClient.watchBlocks(
  { 
    onBlock: block => console.log(block),
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
const unwatch = publicClient.watchBlocks(
  { 
    onBlock: block => console.log(block),
    pollingInterval: 1_000, // [!code focus]
  }
)
```

## 示例

查看下面的实时 [监视区块示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks) 中 `watchBlocks` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/blocks_watching-blocks?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

- 当 `poll: true` 时，在轮询间隔上调用 [`eth_getBlockByNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getBlockByNumber)。
- 当 `poll: false` 且使用 WebSocket 传输时，通过 [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) 和 `"newHeads"` 事件使用 WebSocket 订阅。