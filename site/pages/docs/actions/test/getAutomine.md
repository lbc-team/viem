---
description: 返回节点的自动挖矿状态。
---

# getAutomine

返回节点的自动挖矿状态。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

const isAutomining = await testClient.getAutomine() // [!code focus]
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

## 返回

`boolean`

节点是否正在自动挖矿。