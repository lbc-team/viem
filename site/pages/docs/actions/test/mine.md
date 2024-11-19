---
description: 挖掘指定数量的区块。
---

# mine

挖掘指定数量的区块。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.mine({ // [!code focus:4]
  blocks: 1,
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

### blocks

- **类型:** `number`

要挖掘的区块数量。

```ts
await testClient.mine({
  blocks: 1, // [!code focus:4]
})
```

### interval (可选)

- **类型:** `number`
- **默认值:** `1`

每个区块之间的间隔（秒）。

```ts
await testClient.mine({
  blocks: 10,
  interval: 4 // [!code focus]
})
```