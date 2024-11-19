---
description: 修改（覆盖）账户的 nonce。
---

# setNonce

修改（覆盖）账户的 nonce。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.setNonce({ // [!code focus:4]
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  nonce: 420
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

目标账户的地址。

```ts
await testClient.setNonce({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
  nonce: 420
})
```

### nonce（可选）

- **类型:** `number`

nonce。

```ts
await testClient.setNonce({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  nonce: 420 // [!code focus]
})
```