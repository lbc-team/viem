---
description: 在测试节点网络上启用或禁用日志记录。
---

# setLoggingEnabled

在测试节点网络上启用或禁用日志记录。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setLoggingEnabled(true) // [!code focus]
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