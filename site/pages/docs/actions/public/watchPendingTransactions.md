---
description: 监视并返回待处理的交易哈希。
---

# watchPendingTransactions

监视并返回待处理的交易哈希。

此操作将批量处理在 [`pollingInterval`](#pollinginterval-optional) 中找到的所有待处理交易，并通过 [`onTransactions`](#ontransactions) 调用它们。


## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const unwatch = publicClient.watchPendingTransactions( // [!code focus:99]
  { onTransactions: hashes => console.log(hashes) }
)
// @log: > ['0x...', '0x...', '0x...']
// @log: > ['0x...', '0x...']
// @log: > ['0x...', '0x...', '0x...', ...]
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

`UnwatchFn`

一个可以调用的函数，用于停止监视新的待处理交易哈希。

## 参数

### onTransactions

- **类型:** `(hashes: '0x${string}'[]) => void`

新的待处理交易哈希。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchPendingTransactions(
  { onTransactions: hashes => console.log(hashes) } // [!code focus:1]
)
```

### batch (可选)

- **类型:** `boolean`
- **默认值:** `true`

是否在轮询间隔之间批量处理交易哈希。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchPendingTransactions(
  { 
    batch: false, // [!code focus]
    onTransactions: hashes => console.log(hashes),
  }
)
```

### onError (可选)

- **类型:** `(error: Error) => void`

监听新的待处理交易时抛出的错误。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
// @noErrors
const unwatch = publicClient.watchPendingTransactions(
  { 
    onError: error => console.log(error), // [!code focus:1]
    onTransactions: hashes => console.log(hashes),
  }
)
```

### poll (可选)

- **类型:** `boolean`
- **默认值:** 对于 WebSocket 客户端为 `false`，对于非 WebSocket 客户端为 `true`

是否使用轮询机制检查新的待处理交易，而不是使用 WebSocket 订阅。

此选项仅适用于具有 [WebSocket 传输](/docs/clients/transports/websocket) 的客户端。

```ts twoslash
import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: webSocket()
})

const unwatch = publicClient.watchPendingTransactions(
  { 
    onTransactions: transactions => console.log(transactions),
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
// @noErrors
const unwatch = publicClient.watchPendingTransactions(
  { 
    pollingInterval: 1_000, // [!code focus]
    onTransactions: hashes => console.log(hashes),
  }
)
```

## JSON-RPC 方法

- 当 `poll: true`
  - 调用 [`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter) 来初始化过滤器。
  - 在轮询间隔上调用 [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getFilterChanges)。
- 当 `poll: false` 且使用 WebSocket 传输时，通过 [`eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe-polygon) 和 `"newPendingTransactions"` 事件使用 WebSocket 订阅。