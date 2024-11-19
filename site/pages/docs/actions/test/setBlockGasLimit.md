---
description: 设置区块的 gas 限制。
---

# setBlockGasLimit

设置区块的 gas 限制。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setBlockGasLimit({ // [!code focus:4]
  gasLimit: 420_000n
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

### gasLimit

- **类型:** `bigint`

gas 限制。

```ts
await testClient.setBlockGasLimit({
  gasLimit: 420_000n // [!code focus]
})
```