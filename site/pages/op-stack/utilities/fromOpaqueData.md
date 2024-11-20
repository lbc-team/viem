---
description: 解码在 "TransactionDeposited" 事件日志中找到的不透明存款数据。
---

# opaqueDataToDepositData

解码在 `TransactionDeposited` 事件日志数据中找到的不透明存款数据。

## 导入
```ts
import { opaqueDataToDepositData } from 'viem'
```

## 用法

```ts
import { opaqueDataToDepositData } from 'viem'

const data = opaqueDataToDepositData('0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000045000000000000526c01deadbeef')
```

## 返回

```
{
  mint: bigint
  value: bigint
  gas: bigint
  isCreation: boolean
  data: Hex
}
```

解码后的不透明数据。

## 参数

### opaqueData

- **类型:** `Hex`

ABI（打包）编码的不透明数据。