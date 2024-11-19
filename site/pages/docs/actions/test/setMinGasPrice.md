---
description: 更改网络接受的最低 gas 价格（以 wei 为单位）。
---

# setMinGasPrice

更改网络接受的最低 gas 价格（以 wei 为单位）。

> 注意：`setMinGasPrice` 只能在未启用 EIP-1559 的客户端上使用。

## 用法

:::code-group

```ts [example.ts]
import { parseGwei } from 'viem'
import { testClient } from './client'
 
await testClient.setMinGasPrice({ // [!code focus:99]
  gasPrice: parseGwei('20'),
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

### gasPrice

- **类型：** `bigint`

gas 价格（以 wei 为单位）。

```ts
await testClient.setMinGasPrice({
  gasPrice: parseGwei('20'), // [!code focus]
})
```