---
description: 修改账户的余额。
---

# setBalance

修改账户的余额。

## 用法

:::code-group

```ts [example.ts]
import { parseEther } from 'viem'
import { testClient } from './client'
 
await testClient.setBalance({ // [!code focus:4]
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('1')
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
await testClient.setBalance({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
  value: parseEther('1')
})
```

### value（可选）

- **类型:** `bigint`

要设置的值（以 wei 为单位）。

```ts
await testClient.setBalance({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: 1000000000000000000n // [!code focus]
})
```