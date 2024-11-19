---
description: 将人类可读的 ABI 参数解析为 ABI 参数。
---

# parseAbiParameters

将人类可读的 ABI 参数解析为 [`AbiParameter`s](/docs/glossary/types#abiparameter)。从 [ABIType](https://abitype.dev/api/human#parseabiparameters-1) 重新导出。

## 导入

```ts
import { parseAbiParameters } from 'viem'
```

## 用法

```ts
import { parseAbiParameters } from 'viem'

const abiParameters = parseAbiParameters(
  //  ^? const abiParameters: [{ type: "address"; name: "from"; }, { type: "address";...
  'address from, address to, uint256 amount',
)
```

## 返回

[`Abi`](/docs/glossary/types#abi)

解析后的 ABI 参数。

## 参数

### params

- **类型:** `string | string[]`

人类可读的 ABI 参数。

```ts
import { parseAbiParameters } from 'viem'

const abiParameters = parseAbiParameters([
  //  ^? const abiParameters: [{ type: "tuple"; components: [{ type: "string"; name:...
  'Baz bar',
  'struct Baz { string name; }',
])
```