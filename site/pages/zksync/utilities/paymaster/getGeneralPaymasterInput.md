---
description: 返回编码格式化的一般基础支付主参数。
---

# getGeneralPaymasterInput

返回编码格式化的一般基础支付主参数。

## 导入
```ts
import { getGeneralPaymasterInput } from 'viem/zksync'
```

## 用法

```ts
import { getGeneralPaymasterInput } from 'viem/zksync'

const data = getGeneralPaymasterInput({
  innerInput: '0x',
})
```

## 返回

`EncodeFunctionDataReturnType`

提供的一般基础支付主输入的 `Hex` 值。

## 参数

### innerInput

可以发送到支付主的附加有效负载，以实现任何逻辑 

- **类型:** `Hex` 或 `ByteArray`

```ts
const data = getGeneralPaymasterInput({
      innerInput: new Uint8Array([0, 1, 2, 3, 4, 5]), // [!code focus]
    })
```

```ts
const data = getGeneralPaymasterInput({
      innerInput: "0x0005040302010", // [!code focus]
    })
```