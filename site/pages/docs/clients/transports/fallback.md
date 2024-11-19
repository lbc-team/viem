# 回退传输 [为客户端创建回退传输的函数]

`fallback` 传输消耗 **多个** 传输。如果一个传输请求失败，它将回退到列表中的下一个传输。

## 导入

```ts twoslash
import { fallback } from 'viem'
```

## 用法

```ts twoslash 
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: fallback([ // [!code focus]
    http('https://eth-mainnet.g.alchemy.com/v2/...'), // [!code focus]
    http('https://mainnet.infura.io/v3/...') // [!code focus]
  ]), // [!code focus]
})
```

### 传输排名

传输排名使得传递给 `fallback` 传输的每个传输都可以通过加权移动评分算法自动根据其 **延迟** 和 **稳定性** 进行排名。

每 10 秒（`interval`），`fallback` 传输将对列表中的每个传输进行 ping。对于过去的 10 次 ping（`sampleCount`），它们将根据是否响应（稳定性）和响应速度（延迟）进行排名。该算法对稳定性评分应用 `0.7` 的权重，对延迟评分应用 `0.3` 的权重，以得出最终评分并进行排名。

在样本期间，具有最佳延迟和稳定性评分的传输将优先考虑。

你可以通过 `rank` 选项开启自动排名：

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createPublicClient({
  chain: mainnet,
  transport: fallback([ 
    http('https://eth-mainnet.g.alchemy.com/v2/...'), 
    http('https://mainnet.infura.io/v3/...') 
  ], { rank: true }), // [!code focus]
})
```

你还可以修改默认的排名配置：

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createPublicClient({
  chain: mainnet,
  transport: fallback(
    [
      http('https://eth-mainnet.g.alchemy.com/v2/...'), 
      http('https://mainnet.infura.io/v3/...') 
    ],
    { // [!code focus:9]
      rank: {
        interval: 60_000,
        sampleCount: 5,
        timeout: 500,
        weights: {
          latency: 0.3,
          stability: 0.7
        }
      }
    }
  ),
})
```

## 参数

### rank (可选)

- **类型:** `boolean | RankOptions`
- **默认:** `false`

是否根据传输的延迟和稳定性自动排名。设置为 `false` 以禁用自动排名。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  rank: false, // [!code focus]
})
```

### rank.interval (可选)

- **类型:** `number`
- **默认:** `client.pollingInterval`

排名器应 ping RPC URL 的轮询间隔（以毫秒为单位）。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  rank: { // [!code focus:3]
    interval: 5_000
  },
})
```

### rank.sampleCount (可选)

- **类型:** `number`
- **默认:** `10`

用于排名的先前样本数量。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  rank: { // [!code focus:3]
    sampleCount: 10
  },
})
```

### rank.timeout (可选)

- **类型:** `number`
- **默认:** `1_000`

采样传输时的超时。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  rank: { // [!code focus:3]
    timeout: 500
  },
})
```

### rank.weights.latency (可选)

- **类型:** `number`
- **默认:** `0.3`

应用于延迟评分的权重。该权重与 `weights` 对象中的其他值成比例。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  rank: {
    weights: {
      latency: 0.4, // [!code focus:3]
      stability: 0.6
    }
  },
})
```

### rank.weights.stability (可选)

- **类型:** `number`
- **默认:** `0.7`

应用于稳定性评分的权重。该权重与 `weights` 对象中的其他值成比例。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  rank: {
    weights: {
      latency: 0.4,
      stability: 0.6 // [!code focus:3]
    }
  },
})
```

### retryCount (可选)

- **类型:** `number`
- **默认:** `3`

请求失败时的最大重试次数。

> 注意：回退将首先尝试所有传输，然后再重试。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  retryCount: 5, // [!code focus]
})
```

### retryDelay (可选)

- **类型:** `number`
- **默认:** `150`

重试之间的基本延迟（以毫秒为单位）。默认情况下，传输将使用 [指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)（`~~(1 << count) * retryDelay`），这意味着重试之间的时间不是恒定的。

```ts twoslash
import { createPublicClient, fallback, http } from 'viem'
import { mainnet } from 'viem/chains'
const alchemy = http('') 
const infura = http('') 
// ---cut---
const transport = fallback([alchemy, infura], {
  retryDelay: 100, // [!code focus]
})
```