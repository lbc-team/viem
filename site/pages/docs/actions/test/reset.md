---
description: 将分叉重置回其原始状态。
---

# reset

将分叉重置回其原始状态。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.reset() // [!code focus]
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

### blockNumber (可选)

- **类型:** `bigint`

将分叉重置到给定的区块号。

```ts
await testClient.reset({
  blockNumber: 69420n, // [!code focus]
  jsonRpcUrl: 'https://mainnet.g.alchemy.com/v2'
})
```

### jsonRpcUrl (可选)

- **类型:** `string`

使用给定的 JSON RPC URL 重置分叉。

```ts
await testClient.reset({
  blockNumber: 69420n,
  jsonRpcUrl: 'https://mainnet.g.alchemy.com/v2' // [!code focus]
})
```