---
description: 在当前区块快照区块链的状态。
---

# snapshot

在当前区块快照区块链的状态。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

const id = await testClient.snapshot() // [!code focus]
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

## 返回值

创建的快照的 ID。