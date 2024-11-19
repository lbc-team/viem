---
description: 写入账户存储的一个槽。
---

# setStorageAt

写入账户存储的一个槽。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

await testClient.setStorageAt({ // [!code focus:99]
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  index: 2,
  value: '0x0000000000000000000000000000000000000000000000000000000000000069'
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
await testClient.setStorageAt({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79', // [!code focus]
  index: 2,
  value: '0x0000000000000000000000000000000000000000000000000000000000000069'
})
```

### index

- **类型:** `number | Hash`

存储槽（索引）。可以是数字或哈希值。

```ts
await testClient.setStorageAt({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  index: '0xa6eef7e35abe7026729641147f7915573c7e97b47efa546f5f6e3230263bcb49', // [!code focus]
  value: '0x0000000000000000000000000000000000000000000000000000000000000069'
})
```

### value

- **类型:** `number`

要存储的值，作为 32 字节的十六进制字符串。

```ts
await testClient.setStorageAt({
  address: '0xe846c6fcf817734ca4527b28ccb4aea2b6663c79',
  index: 2,
  value: '0x0000000000000000000000000000000000000000000000000000000000000069' // [!code focus]
})
```