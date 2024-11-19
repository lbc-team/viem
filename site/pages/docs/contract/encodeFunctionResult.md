---
description: 将结构化返回数据编码为 ABI 编码数据。
---

# encodeFunctionResult

将结构化返回数据编码为 ABI 编码数据。它是 [`decodeFunctionResult`](/docs/contract/decodeFunctionResult) 的反向操作。

## 安装

```ts
import { encodeFunctionResult } from 'viem';
```

## 用法

给定一个 ABI (`abi`) 和一个函数 (`functionName`)，传入要编码的值 (`values`)：

:::code-group

```ts [example.ts]
import { encodeFunctionResult } from 'viem';
import { wagmiAbi } from './abi.ts'

const data = encodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf',
  value: ['0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'],
});
// '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac'
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

### 更复杂的示例

:::code-group

```ts [example.ts]
import { decodeFunctionResult } from 'viem'

const data = decodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'getInfo',
  value: [
    {
      foo: {
        sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        x: 69420n,
        y: true
      },
      sender: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      z: 69
    }
  ]
})
// 0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000010f2c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac0000000000000000000000000000000000000000000000000000000000000045
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

### 没有 `functionName`

如果你的 `abi` 只包含一个 ABI 项，可以省略 `functionName`（它变为可选）：

```ts
import { encodeFunctionResult } from 'viem';

const abiItem = {
  inputs: [{ name: 'owner', type: 'address' }],
  name: 'balanceOf',
  outputs: [{ name: '', type: 'uint256' }],
  stateMutability: 'view',
  type: 'function',
}

const data = encodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf', // [!code --]
  value: ['0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'],
});
// '0x000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac'
```

## 返回值

解码后的数据。类型从 ABI 中推断。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const data = encodeFunctionResult({
  abi: wagmiAbi, // [!code focus]
  functionName: 'ownerOf',
  value: ['0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'],
});
```

### functionName

- **类型:** `string`

要从 ABI 编码的函数。

```ts
const data = encodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf', // [!code focus]
  value: ['0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'],
});
```

### values

- **类型**: [`Hex`](/docs/glossary/types#hex)

要编码的返回值。

```ts
const data = encodeFunctionResult({
  abi: wagmiAbi,
  functionName: 'ownerOf',
  value: ['0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'], // [!code focus]
});
```