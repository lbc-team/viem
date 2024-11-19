---
description: 冒充一个账户或合约地址。
---

# impersonateAccount

冒充一个账户或合约地址。这允许你从该账户发送交易，即使你没有访问其私钥。

## 使用方法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.impersonateAccount({ // [!code focus:4]
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
await testClient.impersonateAccount({
  address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
})
```