---
description: 启用或禁用每次提交到网络的新交易时自动挖掘新块。
---

# setAutomine

启用或禁用每次提交到网络的新交易时自动挖掘新块。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.setAutomine(true) // [!code focus]
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

### enabled

- **类型:** `boolean`

```ts
await testClient.setAutomine(false) // [!code focus]
```