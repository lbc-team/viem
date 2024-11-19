---
description: 如果存在，则移除 setBlockTimestampInterval。
---

# removeBlockTimestampInterval

移除 [`setBlockTimestampInterval`](/docs/actions/test/setBlockTimestampInterval) 如果它存在。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.removeBlockTimestampInterval() // [!code focus]
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