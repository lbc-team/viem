---
description: 编码来自函数调用的回退错误。
---

# encodeErrorResult

编码来自函数调用的回退错误。与 [`decodeErrorResult`](/docs/contract/decodeErrorResult) 相对。

## 安装

```ts
import { encodeErrorResult } from 'viem'
```

## 用法

:::code-group

```ts [example.ts]
import { decodeErrorResult } from 'viem'
import { wagmiAbi } from './abi.ts'

const value = encodeErrorResult({
  abi: wagmiAbi,
  errorName: 'InvalidTokenError',
  args: ['sold out']
})
// 0xb758934b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
		inputs: [
			{
				name: "reason",
				type: "string"
			}
		],
		name: "InvalidTokenError",
		type: "error"
	},
  ...
] as const;
```

:::

### 没有 `errorName`

如果你的 `abi` 只包含一个 ABI 项，可以省略 `errorName`（它变为可选）：

```ts
import { decodeErrorResult } from 'viem'

const abiItem = {
  inputs: [{ name: 'reason', type: 'string' }],
  name: 'InvalidTokenError',
  type: 'error'
}

const value = encodeErrorResult({
  abi: [abiItem],
  errorName: 'InvalidTokenError', // [!code --]
  args: ['sold out']
})
// 0xb758934b000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000
```

## 返回值

[`Hex`](/docs/glossary/types#hex)

编码的错误。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const value = decodeErrorResult({
  abi: wagmiAbi, // [!code focus]
  errorName: 'InvalidTokenError',
  args: ['sold out']
})
```

### errorName

- **类型:** `string`

ABI 中的错误名称。

```ts
const value = encodeErrorResult({
  abi: wagmiAbi,
  errorName: 'InvalidTokenError', // [!code focus]
  args: ['sold out']
})
```

### args（可选）

- **类型:** 推断。

传递给错误的参数（如果需要）。

```ts
const value = encodeErrorResult({
  abi: wagmiAbi,
  errorName: 'InvalidTokenError',
  args: ['sold out'] // [!code focus]
})
```