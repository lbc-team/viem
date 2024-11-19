---
description: 监听并返回发出的事件日志。
---

# watchEvent

监听并返回发出的 [事件日志](/docs/glossary/terms#event-log)。

此操作将批量处理在 [`pollingInterval`](#pollinginterval-optional) 中找到的所有事件日志，并通过 [`onLogs`](#onlogs) 调用它们。

`watchEvent` 将尝试创建一个 [事件过滤器](https://viem.sh/docs/actions/public/createEventFilter) 并根据轮询间隔监听过滤器的变化，但是，如果 RPC 提供者不支持过滤器（即 `eth_newFilter`），则 `watchEvent` 将回退到使用 [`getLogs`](/docs/actions/public/getLogs)。

## 用法

默认情况下，你可以通过传递 `onLogs` 来监听所有广播到区块链的事件。

这些事件将被批量处理为 [事件日志](/docs/glossary/terms#event-log) 并发送到 `onLogs`：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const unwatch = publicClient.watchEvent({
  onLogs: logs => console.log(logs)
})
// @log: > [{ ... }, { ... }, { ... }]
// @log: > [{ ... }, { ... }]
// @log: > [{ ... }, { ... }, { ... }, { ... }]
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

## 范围

你还可以将 `watchEvent` 限定为一组给定的属性（如下所列）。

### 地址

`watchEvent` 可以限定为一个 **地址**：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const unwatch = publicClient.watchEvent({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // [!code focus]
  onLogs: logs => console.log(logs)
})
// @log: > [{ ... }, { ... }, { ... }]
// @log: > [{ ... }, { ... }]
// @log: > [{ ... }, { ... }, { ... }, { ... }]
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

### 事件

`watchEvent` 可以限定为一个 **事件**。

`event` 参数接受 ABI 格式的事件 – 我们有一个 [`parseAbiItem` 工具](/docs/abi/parseAbiItem)，你可以用它将人类可读的事件签名转换为 ABI。

:::code-group

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem' // [!code focus]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const unwatch = publicClient.watchEvent({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), // [!code focus]
  onLogs: logs => console.log(logs)
})
// @log: > [{ ... }, { ... }, { ... }]
// @log: > [{ ... }, { ... }]
// @log: > [{ ... }, { ... }, { ... }, { ... }]
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

默认情况下，`event` 接受 [`AbiEvent`](/docs/glossary/types#abievent) 类型：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const unwatch = publicClient.watchEvent(publicClient, {
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: { // [!code focus:8]
    name: 'Transfer', 
    inputs: [
      { type: 'address', indexed: true, name: 'from' },
      { type: 'address', indexed: true, name: 'to' },
      { type: 'uint256', indexed: false, name: 'value' }
    ] 
  },
  onLogs: logs => console.log(logs)
})
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

### 参数

`watchEvent` 可以限定为给定的 **_索引_ 参数**：

:::code-group

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem'
import { publicClient } from './client'

const unwatch = publicClient.watchEvent({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
  onLogs: logs => console.log(logs)
})
// > [{ ... }, { ... }, { ... }]
// > [{ ... }, { ... }]
// > [{ ... }, { ... }, { ... }, { ... }]
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

只有在 `event` 中的索引参数才是 `args` 的候选。

这些参数也可以是一个数组，以指示该位置可以存在其他值：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const unwatch = publicClient.watchEvent({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { // [!code focus:8]
    // '0xd8da...' 或 '0xa5cc...' 或 '0xa152...'
    from: [
      '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 
      '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac',
      '0xa152f8bb749c55e9943a3a0a3111d18ee2b3f94e',
    ],
  },
  onLogs: logs => console.log(logs)
})
```

### 多个事件

`watchEvent` 可以限定为 **多个事件**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbi } from 'viem'

const unwatch = publicClient.watchEvent({
  events: parseAbi([ // [!code focus:5]
    'event Approval(address indexed owner, address indexed sender, uint256 value)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
  ]),
  onLogs: logs => console.log(logs)
})
```

注意：`watchEvent` 限定为多个事件时，不能同时使用 [索引参数](#arguments) (`args`)。

## 返回值

`UnwatchFn`

一个可以调用的函数，用于停止监听新的事件日志。

## 参数

### onLogs

- **类型:** `(logs: Log[]) => void`

新的事件日志。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchEvent(
  { onLogs: logs => console.log(logs) } // [!code focus:1]
)
```

### address (可选)

- **类型:** `Address | Address[]`

合约地址或应来源于的地址列表。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchEvent(
  { 
    address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', // [!code focus]
    onLogs: logs => console.log(logs) 
  }
)
```

### event (可选)

- **类型:** [`AbiEvent`](/docs/glossary/types#abievent)

ABI 格式的事件。

从 viem 导出的 [`parseAbiItem` 工具](/docs/abi/parseAbiItem) 可以将人类可读的事件签名转换为 ABI。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem' // [!code focus]

const unwatch = publicClient.watchEvent(
  { 
    address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), // [!code focus]
    onLogs: logs => console.log(logs) 
  }
)
```

### args (可选)

- **类型:** 推断。

一个 _indexed_ 事件参数的列表。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const unwatch = publicClient.watchEvent(
  { 
    address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
    args: { // [!code focus:4]
      from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
      to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
    },
    onLogs: logs => console.log(logs) 
  }
)
```

### batch (可选)

- **类型:** `boolean`
- **默认值:** `true`

是否在轮询间隔之间批量处理事件日志。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchEvent(
  { 
    batch: false, // [!code focus]
    onLogs: logs => console.log(logs),
  }
)
```

### onError (可选)

- **类型:** `(error: Error) => void`

监听新事件日志时抛出的错误。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchEvent(
  { 
    onError: error => console.log(error) // [!code focus:1]
    onLogs: logs => console.log(logs),
  }
)
```

### poll (可选)

- **类型:** `boolean`
- **默认值:** 对于 WebSocket 客户端为 `false`，对于非 WebSocket 客户端为 `true`

是否使用轮询机制检查新日志，而不是使用 WebSocket 订阅。

此选项仅适用于具有 [WebSocket 传输](/docs/clients/transports/websocket) 的客户端。

```ts twoslash
import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: webSocket()
})

const unwatch = publicClient.watchEvent(
  { 
    onLogs: logs => console.log(logs),
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
const unwatch = publicClient.watchEvent(
  { 
    pollingInterval: 1_000, // [!code focus]
    onLogs: logs => console.log(logs),
  }
)
```

### fromBlock (可选)

- **类型:** `bigint`

开始监听日志的区块号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const unwatch = publicClient.watchEvent(
  { 
    fromBlock: 1n, // [!code focus]
    onLogs: logs => console.log(logs),
  }
)
```

## 实时示例

查看下面的实时 [事件日志示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs) 中 `watchEvent` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

**当 poll 为 `true` 且 RPC 提供者支持 `eth_newFilter` 时：**

- 调用 [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) 创建一个过滤器（在初始化时调用）。
- 在轮询间隔内，它将调用 [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)。

**当 poll 为 `true` 且 RPC 提供者不支持 `eth_newFilter` 时：**

- 在轮询间隔内，对于每个区块调用 [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)。

**当 poll 为 `false` 且使用 WebSocket 传输时：**

- 通过 `eth_subscribe` 和 "logs" 事件使用 WebSocket 订阅。