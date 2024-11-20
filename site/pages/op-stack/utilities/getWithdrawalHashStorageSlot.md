---
description: 计算在证明提款时使用的提款哈希存储槽。
---

# getWithdrawalHashStorageSlot

计算在证明提款时使用的提款哈希存储槽。

## 导入

```ts
import { getWithdrawalHashStorageSlot } from 'viem'
```

## 用法

```ts
import { getWithdrawalHashStorageSlot } from 'viem'

const slot = getWithdrawalHashStorageSlot({ // [!code hl]
  withdrawalHash: '0xB1C3824DEF40047847145E069BF467AA67E906611B9F5EF31515338DB0AABFA2' // [!code hl]
}) // [!code hl]
```

## 返回

`Hex`

存储槽。

## 参数

### withdrawalHash

- **类型:** `Hash`

从 L2 提款 `MessagePassed` 事件中发出的哈希。

```ts
const slot = getWithdrawalHashStorageSlot({ 
  withdrawalHash: '0xB1C3824DEF40047847145E069BF467AA67E906611B9F5EF31515338DB0AABFA2' // [!code focus]
})
```