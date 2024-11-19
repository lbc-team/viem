---
description: 停止在之前使用 impersonateAccount 后冒充一个账户。
---

# stopImpersonatingAccount

在之前使用 [`impersonateAccount`](/docs/actions/test/impersonateAccount) 后停止冒充一个账户。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.stopImpersonatingAccount({ // [!code focus:4]
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'
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
await testClient.stopImpersonatingAccount({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
})
```