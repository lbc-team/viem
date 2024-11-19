---
description: 设置区块的时间戳间隔。
---

# setBlockTimestampInterval

类似于 [`increaseTime`](/docs/actions/test/increaseTime)，但设置一个区块时间戳 `interval`。未来区块的时间戳将计算为 `lastBlock_timestamp` + `interval`。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setBlockTimestampInterval({ // [!code focus:4]
  interval: 5
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

### interval

- **类型:** `number`

```ts
await testClient.setBlockTimestampInterval({
  interval: 1 // [!code focus]
})
```