---
description: 将序列化的交易转换为结构化交易，支持 OP Stack。
---

# parseTransaction (OP Stack)

解析序列化的 RLP 编码交易。支持签名和未签名的存款、EIP-1559、EIP-2930 和传统交易。

## 导入
```ts
import { parseTransaction } from 'viem'
```

## 用法

```ts
import { parseTransaction } from 'viem'

const transaction = parseTransaction('0x02ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0')
```

### 存款交易

`viem/op-stack` 中的 `parseTransaction` 模块也支持解析存款交易（以 `0x7e` 为前缀）：

```ts
import { parseTransaction } from 'viem'

const transaction = parseTransaction('0x7ef83ca018040f35752170c3339ddcd850f185c9cc46bdef4d6e1f2ab323f4d3d710431994977f82a600a1414e583f7f13623f1ac5d58b1c0b808080808080')
```

## 返回

`TransactionSerializable`

解析后的交易对象。

## 参数

### serializedTransaction

- **类型:** `Hex`

序列化的交易。