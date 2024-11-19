# HTTP 传输 [为客户端创建 HTTP 传输的函数]

`http` 传输通过 HTTP 连接到 JSON-RPC API。

## 导入

```ts twoslash
import { http } from 'viem'
```

## 用法

```ts twoslash {4}
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/...'), // [!code focus]
})
```

:::warning[警告]
如果未提供 `url`，则传输将回退到链上的公共 RPC URL。强烈建议提供经过身份验证的 RPC URL 以防止速率限制。
:::

### 批量 JSON-RPC

`http` 传输支持批量 JSON-RPC。这意味着可以在单个 HTTP 请求中发送多个 JSON-RPC 请求。

传输将在给定时间段内批量处理操作，并在单个批量 JSON-RPC HTTP 请求中执行它们。默认情况下，这个时间段是 [零延迟](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays)，这意味着批量请求将在当前 [JavaScript 消息队列](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#queue) 结束时执行。消费者可以指定自定义时间段 `wait`（以毫秒为单位）。

你可以通过将 `batch` 标志设置为 `true` 来启用批量 JSON-RPC：

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: true // [!code focus]
})
```

现在，当你调用操作时，`http` 传输将在消息队列（或自定义时间段）结束时批量发送这些请求，形成一个单一的批量 JSON-RPC HTTP 请求：

```ts twoslash
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/...'), 
})
// ---cut---
// 下面将向 RPC 提供者发送一个单一的批量 JSON-RPC HTTP 请求。
const [blockNumber, balance, ensName] = await Promise.all([
  client.getBlockNumber(),
  client.getBalance({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B' }),
  client.getEnsName({ address: '0xd2135CfB216b74109775236E36d4b433F1DF507B' }),
])
```

## 参数

### url（可选）

- **类型：** `string`
- **默认：** `chain.rpcUrls.default.http[0]`

JSON-RPC API 的 URL。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...')
```

### batch（可选）

- **类型：** `boolean | BatchOptions`
- **默认：** `false`

启用批量 JSON-RPC 的切换

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: true // [!code focus]
})
```

### batch.batchSize（可选）

- **类型：** `number`
- **默认：** `1_000`

在批量中发送的最大 JSON-RPC 请求数量。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: {
    batchSize: 2_000 // [!code focus]
  }
})
```

### batch.wait（可选）

- **类型：** `number`
- **默认：** `0` ( [零延迟](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays) )

发送批量之前等待的最大毫秒数。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  batch: {
    wait: 16 // [!code focus]
  }
})
```

### fetchOptions（可选）

- **类型：** [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/fetch)

传递给内部 `fetch` 函数的 [Fetch 选项](https://developer.mozilla.org/en-US/docs/Web/API/fetch)。用于传递身份验证头或缓存选项。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  fetchOptions: { // [!code focus:5]
    headers: {
      'Authorization': 'Bearer ...'
    }
  }
})
```

### key（可选）

- **类型：** `string`
- **默认：** `"http"`

传输的键。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  key: 'alchemy', // [!code focus]
})
```

### name（可选）

- **类型：** `string`
- **默认：** `"HTTP JSON-RPC"`

传输的名称。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  name: 'Alchemy HTTP Provider', // [!code focus]
})
```

### onFetchRequest（可选）

- **类型：** `(request: Request) => void`

处理 fetch 请求的回调。用于记录或调试。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  onFetchRequest(request) {
    console.log(request) // [!code focus]
  }
})
```

### onFetchResponse（可选）

- **类型：** `(response: Response) => void`

处理 fetch 响应的回调。用于记录或调试。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  onFetchResponse(response) {
    console.log(response) // [!code focus]
  }
})
```

### retryCount（可选）

- **类型：** `number`
- **默认：** `3`

请求失败时重试的最大次数。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  retryCount: 5, // [!code focus]
})
```

### retryDelay（可选）

- **类型：** `number`
- **默认：** `150`

重试之间的基本延迟（以毫秒为单位）。默认情况下，传输将使用 [指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)（`~~(1 << count) * retryDelay`），这意味着重试之间的时间不是恒定的。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  retryDelay: 100, // [!code focus]
})
```

### timeout（可选）

- **类型：** `number`
- **默认：** `10_000`

请求的超时时间。

```ts twoslash
import { http } from 'viem'
// ---cut---
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...', {
  timeout: 60_000, // [!code focus]
})
```