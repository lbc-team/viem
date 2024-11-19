---
description: 监听并返回发出的合约事件日志。
---

# watchContractEvent

监听并返回发出的合约事件日志。

此操作将批量处理在 [`pollingInterval`](#pollinginterval-optional) 中找到的所有事件日志，并通过 [`onLogs`](#onlogs) 调用它们。

`watchContractEvent` 将尝试创建一个 [事件过滤器](/docs/contract/createContractEventFilter) 并根据轮询间隔监听过滤器的变化，但如果 RPC 提供者不支持过滤器（即 `eth_newFilter`），则 `watchContractEvent` 将回退到使用 [`getLogs`](/docs/actions/public/getLogs)。

## 用法

:::code-group

```ts [example.ts]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  onLogs: logs => console.log(logs)
})
// > [{ ... }, { ... }, { ... }]
// > [{ ... }, { ... }]
// > [{ ... }, { ... }, { ... }, { ... }]
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 限定事件名称

你可以在给定的 ABI 上限定事件。

:::code-group

```ts [example.ts] {8}
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  eventName: 'Transfer',
  onLogs: logs => console.log(logs)
})
// > [{ ... }, { ... }, { ... }]
// > [{ ... }, { ... }]
// > [{ ... }, { ... }, { ... }, { ... }]
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      { indexed: true, name: "to", type: "address" },
      {
        indexed: true,
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 限定事件参数

你可以限定给定的 **索引事件参数**。

在下面的示例中，我们想要过滤出由地址 `"0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b"` 发送的 `Transfer`。

> 只有 **`indexed`** 参数在事件 ABI 中是 `args` 的候选（见 `abi.ts`）。

:::code-group

```ts [example.ts] {8-9}
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  eventName: 'Transfer',
  args: { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' },
  onLogs: logs => console.log(logs)
})
// > [{ ... }, { ... }, { ... }]
// > [{ ... }, { ... }]
// > [{ ... }, { ... }, { ... }, { ... }]
```

```ts [abi.ts] {6-8}
export const wagmiAbi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      { 
        indexed: true, 
        name: "to", 
        type: "address" 
      },
      {
        indexed: false,
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  ...
] as const;
```

```ts [client.ts]
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

一个可以调用的函数，用于停止监听新的事件日志。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  onLogs: logs => console.log(logs)
})
```

### onLogs

- **类型:** `(Log[]) => void`

新的事件日志。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  onLogs: logs => console.log(logs) // [!code focus]
})
```

### address (可选)

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。如果未提供地址，则将发出所有与 ABI 上的事件签名匹配的事件。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  onLogs: logs => console.log(logs)
})
```

### args (可选)

- **类型:** 从 ABI 推断。

事件参数以过滤日志。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  eventName: 'Transfer', // [!code focus]
  args: ['0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b'], // [!code focus]
  onLogs: logs => console.log(logs)
})
```

### eventName (可选)

- **类型:** `string`

用于过滤日志的事件名称。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  eventName: 'Transfer', // [!code focus]
  onLogs: logs => console.log(logs)
})
```

### batch (可选)

- **类型:** `boolean`
- **默认值:** `true`

是否在轮询间隔之间批量处理日志。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  batch: false, // [!code focus]
  onLogs: logs => console.log(logs)
})
```

### onError (可选)

- **类型:** `(error: Error) => void`

监听新事件日志时抛出的错误。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  onError: error => console.log(error), // [!code focus]
  onLogs: logs => console.log(logs)
})
```

### poll (可选)

- **类型:** `boolean`
- **默认值:** 对于 WebSocket 客户端为 `false`，对于非 WebSocket 客户端为 `true`

是否使用轮询机制检查新日志，而不是 WebSocket 订阅。

此选项仅适用于具有 [WebSocket 传输](/docs/clients/transports/websocket) 的客户端。

```ts
import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: webSocket()
})

const unwatch = publicClient.watchContractEvent(
  { 
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: wagmiAbi,
    poll: true, // [!code focus]
  }
)
```

### pollingInterval (可选)

- **类型:** `number`

轮询频率（以毫秒为单位）。默认为客户端的 `pollingInterval` 配置。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  pollingInterval: 1_000, // [!code focus]
  onLogs: logs => console.log(logs)
})
```

### fromBlock (可选)

- **类型:** `bigint`

开始监听日志的区块号。

```ts
const unwatch = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  onLogs: logs => console.log(logs),
  fromBlock: 1n // [!code focus]
})
```

## JSON-RPC 方法

**当 poll 为 `true` 且 RPC 提供者支持 `eth_newFilter` 时：**

- 调用 [`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter) 创建一个过滤器（在初始化时调用）。
- 在轮询间隔内，它将调用 [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)。

**当 poll 为 `true` 且 RPC 提供者不支持 `eth_newFilter` 时：**

- 对于轮询间隔内的每个区块，调用 [`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)。

**当 poll 为 `false` 且使用 WebSocket 传输时：**

- 通过 `eth_subscribe` 和 "logs" 事件使用 WebSocket 订阅。