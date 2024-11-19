---
description: 将部署数据（字节码和构造函数参数）编码为 ABI 编码值。
---

# encodeDeployData

将部署数据（字节码和构造函数参数）编码为 ABI 编码值。

## 安装

```ts
import { encodeDeployData } from 'viem'
```

## 用法

以下是如何编码部署数据的一个非常基本的示例。

:::code-group

```ts [example.ts]
import { encodeDeployData } from 'viem'
import { wagmiAbi } from './abi.ts'

const data = encodeDeployData({
  abi: wagmiAbi,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...'
})
// 0x608060405260405161083e38038061083e833981016040819052610...
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  { 
    inputs: [], 
    stateMutability: 'nonpayable', 
    type: 'constructor' 
  },
  ...
] as const;
```

:::

### 传递参数

如果你的构造函数需要参数，你可以通过 `args` 属性传递它们。

`args` 的 TypeScript 类型将从构造函数和 ABI 中推断，以防止你插入错误的值。

例如，下面的 `constructor` 需要一个 **地址** 参数，并且它的类型为 `["0x${string}"]`。

:::code-group

```ts [example.ts]
import { encodeDeployData } from 'viem'
import { wagmiAbi } from './abi'

const data = encodeDeployData({
  abi: wagmiAbi,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
// 0x608060405260405161083e38038061083e833981016040819052610...00000000000000000000000000000000a5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: 'owner', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  ...
] as const;
```

:::

## 返回值

[`Hex`](/docs/glossary/types#hex)

ABI 编码的数据（字节码和构造函数参数）。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const data = encodeDeployData({
  abi: wagmiAbi, // [!code focus]
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
```

### bytecode

- **类型:** [`Hex`](/docs/glossary/types#hex)

合约字节码。

```ts
const data = encodeDeployData({
  abi: wagmiAbi,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', // [!code focus]
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
```

### args（可选）

- **类型:** 从 ABI 推断。

传递给函数调用的参数。

```ts
const data = encodeDeployData({
  abi: wagmiAbi,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'] // [!code focus]
})
```