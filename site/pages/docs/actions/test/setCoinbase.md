---
description: 设置用于新块的 coinbase 地址。
---

# setCoinbase

设置用于新块的 coinbase 地址。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setCoinbase({ // [!code focus:99]
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
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

### address

- **类型:** [`Address`](/docs/glossary/types#address)

coinbase 地址。

```ts
await testClient.setCoinbase({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79', // [!code focus]
})
```