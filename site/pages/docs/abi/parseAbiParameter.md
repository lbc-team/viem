---
description: 将人类可读的 ABI 参数解析为 ABI 参数。
---

# parseAbiParameter

将人类可读的 ABI 参数解析为 [`AbiParameter`](/docs/glossary/types#abiparameter)。从 [ABIType](https://abitype.dev/api/human#parseabiparameter-1) 重新导出。

## 导入

```ts
import { parseAbiParameter } from 'viem'
```

## 用法

```ts
import { parseAbiParameter } from 'viem'

const abiParameter = parseAbiParameter('address from')
//    ^? const abiParameter: { type: "address"; name: "from"; }
```

## 返回

[`Abi`](/docs/glossary/types#abi)

解析后的 ABI 参数。

## 参数

### signature

- **类型:** `string | string[]`

人类可读的 ABI 参数。

```ts
import { parseAbiParameter } from 'viem'

const abiParameter = parseAbiParameter([
  //  ^? const abiParameter: { type: "tuple"; components: [{ type: "string"; name:...
  'Baz bar',
  'struct Baz { string name; }',
])
```