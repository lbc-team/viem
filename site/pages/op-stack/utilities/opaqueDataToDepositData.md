---
description: 将不透明数据转换为结构化的存款数据格式。
---

# opaqueDataToDepositData

将不透明数据转换为结构化的存款数据对象。这包括从十六进制字符串中提取和转换 `mint`、`value`、`gas`、`isCreation` 标志和 `data`。

## 导入

```ts
import { opaqueDataToDepositData } from "viem";
```

## 用法

```ts
import { opaqueDataToDepositData } from "viem";

const opaqueData =
  "0x00000000000000000000000000000000000000000000000000470DE4DF82000000000000000000000000000000000000000000000000000000470DE4DF82000000000000000186A00001";

const depositData = opaqueDataToDepositData(opaqueData);
// {
//   mint: 20000000000000000n,
//   value: 20000000000000000n,
//   gas: 100000n,
//   isCreation: false,
//   data: '0x01',
// }
```

## 返回

`OpaqueDataToDepositDataReturnType`

一个包含解析后的存款数据的对象。

## 参数

### opaqueData

- **类型:** `Hex`

不透明的十六进制编码数据。

## 错误

`OpaqueDataToDepositDataErrorType`

一个错误类型，包括在解析过程中遇到的潜在切片、大小和通用错误。