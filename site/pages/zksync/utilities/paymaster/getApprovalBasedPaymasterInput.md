---
description: 返回编码格式化的基于批准的支付主参数。
---

# getApprovalBasedPaymasterInput

返回编码格式化的基于批准的支付主参数。

## 导入

```ts
import { getApprovalBasedPaymasterInput } from 'viem/zksync'
```

## 用法

```ts
import { getApprovalBasedPaymasterInput } from 'viem/zksync'

const data = getApprovalBasedPaymasterInput({
  innerInput: '0x',
  minAllowance: 1n,
  token: "0x65C899B5fb8Eb9ae4da51D67E1fc417c7CB7e964",
})
```

## 返回

`EncodeFunctionDataReturnType`

提供的基于批准的支付主输入的 `Hex` 值。

## 参数

### token

- **类型:** `Address`

代币地址。

```ts
const data = getApprovalBasedPaymasterInput({
  innerInput: '0x',
  minAllowance: 1n,
  token: "0x65C899B5fb8Eb9ae4da51D67E1fc417c7CB7e964", // [!code focus]
})
```

### minAllowance

- **类型:** `bigint`

可以发送到支付主的代币的最低允许额度（以 wei 为单位）。

```ts
const data = getApprovalBasedPaymasterInput({
  innerInput: new Uint8Array(),
  minAllowance: 1n, // [!code focus]
  token: "0x65C899B5fb8Eb9ae4da51D67E1fc417c7CB7e964",
})
```

### innerInput

- **类型:** `Hex | ByteArray`

可以发送到支付主的附加有效负载，以实现任何逻辑。

```ts
const data = getApprovalBasedPaymasterInput({
  innerInput: "0x0005040302010", // [!code focus]
  minAllowance: 1n, 
  token: "0x65C899B5fb8Eb9ae4da51D67E1fc417c7CB7e964",
})
```