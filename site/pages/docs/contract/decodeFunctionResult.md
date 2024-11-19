---
description: 解码合约函数调用的结果。
---

# decodeFunctionResult

解码合约函数调用的结果。

## 安装

```ts
import { decodeFunctionResult } from 'viem'
```

## 用法

给定一个 ABI (`abi`) 和一个函数 (`functionName`)，传入编码的 calldata (`data`) 以检索解码的值：

:::code-group

```ts [example.ts]
import { decodeFunctionResult } from 'viem'
import { wagmiAbi } from './abi.ts'

const value = decodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf',
  data: '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac'
})
// '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  ...
] as const;
```

:::

### 没有 `functionName`

如果你的 `abi` 只包含一个 ABI 项，可以省略 `functionName`（它变为可选）：

:::code-group

```ts [example.ts]
import { decodeFunctionResult } from 'viem'
import { abiItem } from './abi.ts'

const value = decodeFunctionResult({
  abi: [abiItem],
  functionName: 'ownerOf', // [!code --]
  data: '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac'
})
// '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
```
```ts [abi.ts]
const abiItem = {
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  name: 'ownerOf',
  outputs: [{ name: '', type: 'address' }],
  stateMutability: 'view',
  type: 'function',
}

```
:::


### 更复杂的示例

:::code-group

```ts [example.ts]
import { decodeFunctionResult } from 'viem'

const value = decodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'getInfo',
  data: '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000010f2c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000000045'
})
/**
 * {
 *  foo: {
 *    sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *    x: 69420n,
 *    y: true
 *  },
 *  sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
 *  z: 69
 * }
 */
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: 'getInfo',
    outputs: [
      {
        components: [
          {
            components: [
              {
                name: 'sender',
                type: 'address',
              },
              {
                name: 'x',
                type: 'uint256',
              },
              {
                name: 'y',
                type: 'bool',
              },
            ],
            name: 'foo',
            type: 'tuple',
          },
          {
            name: 'sender',
            type: 'address',
          },
          {
            name: 'z',
            type: 'uint32',
          },
        ],
        name: 'res',
        type: 'tuple',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  ...
] as const;
```

:::

## 返回值

解码后的数据。类型从 ABI 中推断。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const value = decodeFunctionResult({
  abi: wagmiAbi, // [!code focus]
  functionName: 'ownerOf',
  data: '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac'
})
```

### functionName

- **类型:** `string`

要从 ABI 编码的函数。

```ts
const value = decodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf', // [!code focus]
  data: '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac'
})
```

### data

- **类型:** [`Hex`](/docs/glossary/types#hex)

calldata。

```ts
const value = decodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf',
  data: '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac' // [!code focus]
})
```