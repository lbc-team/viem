---
description: 将函数名称和参数编码为 ABI 编码值（4 字节选择器和参数）。
---

# encodeFunctionData

将函数名称和参数编码为 ABI 编码值（4 字节选择器和参数）。

## 安装

```ts
import { encodeFunctionData } from 'viem'
```

## 用法

下面是如何将函数编码为 calldata 的一个非常基本的示例。

:::code-group

```ts [example.ts]
import { encodeFunctionData } from 'viem'
import { wagmiAbi } from './abi.ts'

const data = encodeFunctionData({
  abi: wagmiAbi,
  functionName: 'totalSupply'
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  ...
] as const;
```

:::

### 传递参数

如果你的函数需要参数，你可以通过 `args` 属性传递它们。

`args` 的 TypeScript 类型将从函数名称和 ABI 中推断，以防止你插入错误的值。

例如，下面的 `balanceOf` 函数名称需要一个 **address** 参数，并且它的类型为 `["0x${string}"]`。

:::code-group

```ts [example.ts]
import { encodeFunctionData } from 'viem'
import { wagmiAbi } from './abi'

const data = encodeFunctionData({
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  ...
] as const;
```

:::

### 没有 `functionName`

如果你的 `abi` 只包含一个 ABI 项，你可以省略 `functionName`（它变为可选）：

```ts
import { encodeFunctionData } from 'viem'

const abiItem = {
  inputs: [{ name: 'owner', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ name: '', type: 'uint256' }],
  stateMutability: 'view',
  type: 'function',
}

const data = encodeFunctionData({
  abi: [abiItem],
  functionName: 'balanceOf', // [!code --]
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
```

### 准备（性能优化）

如果你多次调用相同的函数，可以一次准备函数选择器并重复使用它。

```ts
import { prepareEncodeFunctionData, encodeFunctionData } from 'viem'

const transfer = prepareEncodeFunctionData({
  abi: erc20Abi,
  functionName: 'transfer',
})

for (const address of addresses) {
  const data = encodeFunctionData({
    ...transfer,
    args: [address, 69420n],
  })
}
```

## 返回值

[`Hex`](/docs/glossary/types#hex)

ABI 编码数据（4 字节函数选择器和参数）。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const data = encodeFunctionData({
  abi: wagmiAbi, // [!code focus]
  functionName: 'totalSupply',
})
```

### functionName

- **类型:** `string`

要从 ABI 编码的函数。

```ts
const data = encodeFunctionData({
  abi: wagmiAbi,
  functionName: 'totalSupply', // [!code focus]
})
```

### args（可选）

- **类型:** 从 ABI 推断。

传递给函数调用的参数。

```ts
const data = encodeFunctionData({
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'] // [!code focus]
})
```