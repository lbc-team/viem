---
description: 按给定的时间（以秒为单位）向前跳跃。
---

# increaseTime

按给定的时间（以秒为单位）向前跳跃。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.increaseTime({ // [!code focus:4]
  seconds: 420,
})
```

```ts [client.ts]
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'

export const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
```

:::

## 参数

### seconds

- **类型:** `number`

向前跳跃的秒数。

```ts
await testClient.increaseTime({
  seconds: 20, // [!code focus]
})
```