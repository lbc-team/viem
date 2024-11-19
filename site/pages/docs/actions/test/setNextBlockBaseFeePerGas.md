---
description: 设置下一个区块的每单位 gas 的基础费用。
---

# setNextBlockBaseFeePerGas

设置下一个区块的每单位 gas 的基础费用。

## 用法

:::code-group

```ts [example.ts]
import { parseGwei } from 'viem'
import { testClient } from './client'
 
await testClient.setNextBlockBaseFeePerGas({ // [!code focus:4]
  baseFeePerGas: parseGwei('20')
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

### baseFeePerGas

- **类型:** `bigint`

每单位 gas 的基础费用。

```ts
await testClient.setNextBlockBaseFeePerGas({
  baseFeePerGas: parseGwei('30') // [!code focus]
})
```