---
description: 序列化交易对象，支持 OP Stack。
---

# serializeTransaction (OP Stack)

序列化交易对象，支持 OP Stack 交易。支持存款、EIP-1559、EIP-2930 和传统交易。

## 导入

```ts
import { serializeTransaction } from 'viem/op-stack'
```

## 用法

```ts
import { serializeTransaction } from 'viem/op-stack'

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

### 存款交易

`viem/op-stack` 模块的 `serializeTransaction` 也支持序列化存款交易：

```ts
import { parseEther } from 'viem'
import { serializeTransaction } from 'viem/op-stack'

const serialized = serializeTransaction({
  from: '0x977f82a600a1414e583f7f13623f1ac5d58b1c0b',
  gas: 21000n,
  mint: parseEther('1'),
  sourceHash: '0x18040f35752170c3339ddcd850f185c9cc46bdef4d6e1f2ab323f4d3d7104319',
  value: parseEther('1'),
  type: 'deposit'
})
```

## 返回值

根据交易类型返回一个模板 `Hex` 值：

- `deposit`: [TransactionSerializedDeposit](/docs/glossary/types#TransactionSerializedDeposit)
- `eip1559`: [TransactionSerializedEIP1559](/docs/glossary/types#TransactionSerializedEIP1559)
- `eip2930`: [TransactionSerializedEIP2930](/docs/glossary/types#TransactionSerializedEIP2930)
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

可选的签名以包含。**对于存款交易被忽略。**

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