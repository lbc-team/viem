---
description: 解码 ABI 编码的数据（4 字节选择器和参数）为函数名称和参数。
---

# decodeFunctionData

解码 ABI 编码的数据（4 字节选择器和参数）为函数名称和参数。

与 [`encodeFunctionData`](/docs/contract/encodeFunctionData) 相对。

## 安装

```ts
import { decodeFunctionData } from 'viem'
```

## 用法

下面是一个非常基本的示例，演示如何解码函数到 calldata。

:::code-group

```ts [example.ts]
import { decodeFunctionData } from 'viem'
import { wagmiAbi } from './abi.ts'

const { functionName } = decodeFunctionData({
  abi: wagmiAbi,
  data: '0x18160ddd'
})
// { functionName: 'totalSupply' }
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

### 提取参数

如果你的 calldata 包含在 4 字节函数签名之后的参数，你可以通过 `args` 返回值提取它们。

:::code-group

```ts [example.ts]
import { decodeFunctionData } from 'viem'
import { wagmiAbi } from './abi'

// [!code word:args:1]
const { functionName, args } = decodeFunctionData({
  abi: wagmiAbi,
  data: '0x70a08231000000000000000000000000fba3912ca04dd458c843e2ee08967fc04f3579c2'
})
// { functionName: 'balanceOf', args: ["0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2"] }
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

## 返回值

```ts
{
  functionName: string;
  args: unknown[] | undefined;
}
```

解码后的 ABI 函数数据。

### functionName

- **类型**: `string`

解码后的函数名称。

### args

- **类型**: `unknown[] | undefined`

解码后的函数参数。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const { functionName } = decodeFunctionData({
  abi: wagmiAbi, // [!code focus]
  data: '0x18160ddd'
})
```

### data

- **类型:** [`Hex`](/docs/glossary/types#hex)

编码的 calldata。

```ts
const { functionName } = decodeFunctionData({
  abi: wagmiAbi,
  data: '0x18160ddd' // [!code focus]
})
```