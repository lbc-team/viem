# IPC 传输 [为客户端创建 IPC 传输的函数]

`ipc` 传输通过 IPC（进程间通信）连接到 JSON-RPC API。

## 导入

```ts twoslash
import { ipc } from 'viem/node'
```

## 用法

```ts twoslash
import { createPublicClient } from 'viem'
import { ipc } from 'viem/node'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet, 
  transport: ipc('/tmp/reth.ipc'), // [!code hl]
})
```

## 参数

### path

- **类型:** `string`

IPC 传输应连接的路径。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc')
```

### key（可选）

- **类型:** `string`
- **默认:** `"ipc"`

传输的键。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', { 
  key: 'reth-ipc',  // [!code focus]
})
```

### name（可选）

- **类型:** `string`
- **默认:** `"IPC JSON-RPC"`

传输的名称。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', { 
  name: 'Reth IPC',  // [!code focus]
})
```

### reconnect（可选）

- **类型:** `boolean | { maxAttempts?: number, delay?: number }`
- **默认:** `true`

是否在套接字失败时尝试重新连接。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', {
  reconnect: false, // [!code focus]
})
```

#### reconnect.attempts（可选）

- **类型:** `number`
- **默认:** `5`

尝试重新连接的最大次数。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', {
  reconnect: {
    attempts: 10, // [!code focus]
  }
})
```

#### reconnect.delay（可选）

- **类型:** `number`
- **默认:** `2_000`

重新连接尝试之间的重试延迟（以毫秒为单位）。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', {
  reconnect: {
    delay: 1_000, // [!code focus]
  }
})
```

### retryCount（可选）

- **类型:** `number`
- **默认:** `3`

请求失败时的最大重试次数。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', {
  retryCount: 5, // [!code focus]
})
```

### retryDelay（可选）

- **类型:** `number`
- **默认:** `150`

重试之间的基本延迟（以毫秒为单位）。默认情况下，传输将使用 [指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)（`~~(1 << count) * retryDelay`），这意味着重试之间的时间不是恒定的。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', {
  retryDelay: 100, // [!code focus]
})
```

### timeout（可选）

- **类型:** `number`
- **默认:** `10_000`

异步 IPC 请求的超时。

```ts twoslash
import { ipc } from 'viem/node'
// ---cut---
const transport = ipc('/tmp/reth.ipc', {
  timeout: 60_000, // [!code focus]
})
```