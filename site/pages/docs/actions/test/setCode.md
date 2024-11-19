---
description: 修改存储在账户地址的字节码。
---

# setCode

修改存储在账户地址的字节码。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setCode({ // [!code focus:4]
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...'
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

账户地址。

```ts
await testClient.setCode({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79', // [!code focus]
  bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...'
})
```

### bytecode

- **类型:** [`Hex`](/docs/glossary/types#hex)

存储的字节码。

```ts
await testClient.setCode({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  bytecode: '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df...' // [!code focus]
})
```