---
description: 从内存池中移除一个交易。
---

# dropTransaction

从内存池中移除一个交易。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.dropTransaction({ // [!code focus:4]
  hash: '0xe58dceb6b20b03965bb678e27d141e151d7d4efc2334c2d6a49b9fac523f7364'
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

### hash

- **类型:** [`Hash`](/docs/glossary/types#hash)

交易的哈希值。

```ts
await testClient.dropTransaction({
  hash: '0xe58dceb6b20b03965bb678e27d141e151d7d4efc2334c2d6a49b9fac523f7364', // [!code focus]
})
```