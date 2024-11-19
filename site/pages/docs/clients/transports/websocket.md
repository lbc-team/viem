# WebSocket 传输 [为客户端创建 WebSocket 传输的函数]

`webSocket` 传输通过 WebSocket 连接到 JSON-RPC API。

## 导入

```ts twoslash
import { webSocket } from 'viem'
```

## 用法

```ts twoslash {4}
import { createPublicClient, webSocket } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet, 
  transport: webSocket('wss://eth-mainnet.g.alchemy.com/v2/...'), // [!code focus]
})
```

:::warning[警告]
如果未提供 `url`，则传输将回退到链上的公共 RPC URL。强烈建议提供经过身份验证的 RPC URL 以防止速率限制。
:::

## 参数

### url

- **类型:** `string`

JSON-RPC API 的 URL。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...')
```

### keepAlive (可选)

- **类型:** `boolean | { interval?: number }`
- **默认:** `true`

是否发送保持活动的 ping 消息。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  keepAlive: { interval: 1_000 }, // [!code focus]
})
```

### key (可选)

- **类型:** `string`
- **默认:** `"webSocket"`

传输的键。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', { 
  key: 'alchemy',  // [!code focus]
})
```

### name (可选)

- **类型:** `string`
- **默认:** `"WebSocket JSON-RPC"`

传输的名称。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', { 
  name: 'Alchemy WebSocket Provider',  // [!code focus]
})
```

### reconnect (可选)

- **类型:** `boolean | { maxAttempts?: number, delay?: number }`
- **默认:** `true`

是否在 socket 失败时尝试重新连接。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  reconnect: false, // [!code focus]
})
```

#### reconnect.attempts (可选)

- **类型:** `number`
- **默认:** `5`

尝试重新连接的最大次数。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  reconnect: {
    attempts: 10, // [!code focus]
  }
})
```

#### reconnect.delay (可选)

- **类型:** `number`
- **默认:** `2_000`

重新连接尝试之间的重试延迟（以毫秒为单位）。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  reconnect: {
    delay: 1_000, // [!code focus]
  }
})
```

### retryCount (可选)

- **类型:** `number`
- **默认:** `3`

请求失败时的最大重试次数。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  retryCount: 5, // [!code focus]
})
```

### retryDelay (可选)

- **类型:** `number`
- **默认:** `150`

重试之间的基本延迟（以毫秒为单位）。默认情况下，传输将使用 [指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)（`~~(1 << count) * retryDelay`），这意味着重试之间的时间不是恒定的。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  retryDelay: 100, // [!code focus]
})
```

### timeout (可选)

- **类型:** `number`
- **默认:** `10_000`

异步 WebSocket 请求的超时。

```ts twoslash
import { webSocket } from 'viem'
// ---cut---
const transport = webSocket('wss://eth-mainnet.g.alchemy.com/v2/...', {
  timeout: 60_000, // [!code focus]
})
```