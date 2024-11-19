---
description: 将序列化的交易转换为结构化交易。
---

# parseTransaction

解析序列化的 RLP 编码交易。支持签名和未签名的 EIP-1559、EIP-2930 和传统交易。

## 导入
```ts
import { parseTransaction } from 'viem'
```

## 用法
```ts
import { parseTransaction } from 'viem'

const transaction = parseTransaction('0x02ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0')
```

## 返回

`TransactionSerializable`

解析后的交易对象。

## 参数

### serializedTransaction

- **类型:** `Hex`

序列化的交易。