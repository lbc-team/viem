---
description: 计算存款交易的源哈希。
---

# getSourceHash

计算存款交易的 [源哈希](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md#source-hash-computation)。

## 导入
```ts
import { getSourceHash } from 'viem'
```

## 用法

```ts
import { getSourceHash } from 'viem'

// 用户存款
const sourceHash = getSourceHash({
  domain: 'userDeposit',
  l1BlockHash:
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  l1LogIndex: 196,
})

// L1 属性存款
const sourceHash = getSourceHash({
  domain: 'l1InfoDeposit',
  l1BlockHash:
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  sequenceNumber: 1,
})
```

## 返回

`Hex`

存款交易的源哈希。

## 参数

### domain

- **类型:** `"userDeposit" | "l1InfoDeposit"`

存款交易的域。

```ts
const sourceHash = getSourceHash({
  domain: 'userDeposit', // [!code focus]
  l1BlockHash:
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  l1LogIndex: 196,
})
```

### l1BlockHash

- **类型:** `Hex`

存款交易包含的 L1 块的哈希。

```ts
const sourceHash = getSourceHash({
  domain: 'userDeposit',
  l1BlockHash:
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7', // [!code focus]
  l1LogIndex: 196,
})
```

### l1LogIndex

- **类型:** `number`

L1 日志的索引。**仅在 `"userDeposit"` 域中需要。**

```ts
const sourceHash = getSourceHash({
  domain: 'userDeposit',
  l1BlockHash:
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  l1LogIndex: 196, // [!code focus]
})
```

### sequenceNumber

- **类型:** `number`

序列号（L2 块号与第一个 L2 纪元块号之间的差）。**仅在 `"l1InfoDeposit"` 域中需要。**

```ts
const sourceHash = getSourceHash({
  domain: 'l1InfoDeposit',
  l1BlockHash:
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  sequenceNumber: 1, // [!code focus]
})
```