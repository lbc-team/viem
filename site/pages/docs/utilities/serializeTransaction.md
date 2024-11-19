---
description: 序列化交易对象。
---

# serializeTransaction

序列化交易对象。支持 EIP-1559、EIP-2930 和传统交易。

## 导入

```ts
import { serializeTransaction } from 'viem'
```

## 用法

```ts
import { serializeTransaction } from 'viem'

const serialized = serializeTransaction({
  chainId: 1,
  gas: 21001n,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'),
  nonce: 69,
  to: "0x1234512345123451234512345123451234512345",
  value: parseEther('0.01'),
})
```

## 返回值

根据交易类型返回一个模板 `Hex` 值：

- `eip1559`: [TransactionSerializedEIP1559](/docs/glossary/types#TransactionSerializedEIP1559)
- `eip2930`: [TransactionSerializedEIP2930](/docs/glossary/types#TransactionSerializedEIP2930)
- `eip4844`: [TransactionSerializedEIP4844](/docs/glossary/types#TransactionSerializedEIP4844)
- `eip7702`: [TransactionSerializedEIP7702](/docs/glossary/types#TransactionSerializedEIP7702)
- `legacy`: [TransactionSerializedLegacy](/docs/glossary/types#TransactionSerializedLegacy) 

## 参数

### transaction

- **类型:** `TransactionSerializable`

要序列化的交易对象。

```ts
const serialized = serializeTransaction({
  chainId: 1,
  gas: 21001n,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'),
  nonce: 69,
  to: '0x1234512345123451234512345123451234512345',
  value: parseEther('0.01'),
})
```

### signature

- **类型:** `Hex`

可选的签名以包含。

```ts
const serialized = serializeTransaction({
  chainId: 1,
  gas: 21001n,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'),
  nonce: 69,
  to: '0x1234512345123451234512345123451234512345',
  value: parseEther('0.01'),
}, { // [!code focus:5]
  r: '0x123451234512345123451234512345123451234512345123451234512345',
  s: '0x123451234512345123451234512345123451234512345123451234512345',
  yParity: 1
})
```