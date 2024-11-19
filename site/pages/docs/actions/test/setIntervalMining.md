---
description: 设置区块的自动挖矿间隔（以秒为单位）。
---

# setIntervalMining

设置区块的自动挖矿间隔（以秒为单位）。将间隔设置为 `0` 将禁用自动挖矿。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setIntervalMining({ // [!code focus:4]
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

挖矿间隔（以秒为单位）。将间隔设置为 `0` 将禁用自动挖矿。

```ts
await testClient.setIntervalMining({
  interval: 5 // [!code focus]
})
```