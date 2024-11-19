---
description: 设置后端 RPC URL。
---

# setRpcUrl

设置后端 RPC URL。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.setRpcUrl('https://eth-mainnet.g.alchemy.com/v2') // [!code focus]
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