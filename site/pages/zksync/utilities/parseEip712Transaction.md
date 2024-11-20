---
description: 解析 EIP712 交易。
---

# parseEip712Transaction

解析序列化的 EIP712 交易。

## 导入

```ts
import { parseEip712Transaction } from 'viem/zksync'
```

## 用法

```ts
import { parseEip712Transaction } from 'viem/zksync'

const serializedTransaction =
    '0x71f87f8080808094a61464658afeaf65cccaafd3a512b69a83b77618830f42408001a073a20167b8d23b610b058c05368174495adf7da3a4ed4a57eb6dbdeb1fafc24aa02f87530d663a0d061f69bb564d2c6fb46ae5ae776bbd4bd2a2a4478b9cd1b42a82010e9436615cf349d7f6344891b1e7ca7c72883f5dc04982c350c080c0'
const transaction = parseEip712Transaction(serializedTransaction)
```

## 返回

`ZksyncTransactionSerializableEIP712`

ZKsync EIP712 交易。

## 参数

### tx

- **类型:** [`Hex`](/docs/glossary/types#hex)

序列化的 EIP712 交易。

```ts
const serializedTransaction =
    '0x71f87f8080808094a61464658afeaf65cccaafd3a512b69a83b77618830f42408001a073a20167b8d23b610b058c05368174495adf7da3a4ed4a57eb6dbdeb1fafc24aa02f87530d663a0d061f69bb564d2c6fb46ae5ae776bbd4bd2a2a4478b9cd1b42a82010e9436615cf349d7f6344891b1e7ca7c72883f5dc04982c350c080c0'
const transaction = parseEip712Transaction(serializedTransaction)
```