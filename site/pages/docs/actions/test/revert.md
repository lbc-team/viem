---
description: 在当前区块还原区块链的状态。
---

# revert

在当前区块还原区块链的状态。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.revert({ // [!code focus:99]
  id: '0x...'
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

### id

- **类型:** ``"0x${string}"``

快照 ID。

```ts
await testClient.revert({
  id: '0x...' // [!code focus]
})
```