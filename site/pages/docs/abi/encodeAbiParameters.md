---
description: 生成 ABI 编码数据。
---

# encodeAbiParameters

根据一组 ABI 参数（`inputs`/`outputs`）及其对应的值，生成使用 [ABI 规范](https://docs.soliditylang.org/en/latest/abi-spec.html) 的 ABI 编码数据。

`encodeAbiParameters` 函数被其他合约编码工具（即 `encodeFunctionData`、`encodeEventTopics` 等）使用。

## 导入

```ts
import { encodeAbiParameters } from 'viem'
```

## 用法

`encodeAbiParameters` 函数接受两个参数：

- 一组 ABI 参数（`params`），可以是 ABI 项的 `inputs` 或 `outputs` 属性的形状。
- 一组值（`values`），对应于给定的 `params`。

```ts
import { encodeAbiParameters } from 'viem'

const encodedData = encodeAbiParameters(
  [
    { name: 'x', type: 'string' },
    { name: 'y', type: 'uint' },
    { name: 'z', type: 'bool' }
  ],
  ['wagmi', 420n, true]
)
// 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000
```

### 可读性

你还可以使用 [`parseAbiParameters` 工具](/docs/abi/parseAbiParameters) 传入 [可读性](/docs/glossary/terms#human-readable-abi) 参数。

```ts
import { encodeAbiParameters, parseAbiParameters } from 'viem'

const encodedData = encodeAbiParameters(
  parseAbiParameters('string x, uint y, bool z'),
  ['wagmi', 420n, true]
)
// 0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000
```

## 返回

[`Hex`](/docs/glossary/types#hex)

ABI 编码数据。

## 参数

### params

- **类型**: [`AbiParameter[]`](/docs/glossary/terms#abiparameter)

要编码的 ABI 参数集，形状为 ABI 事件/函数的 `inputs` 或 `outputs` 属性。

这些参数必须包含有效的 [ABI 类型](https://docs.soliditylang.org/en/develop/abi-spec#types)。

```ts
encodeAbiParameters(
  [{ name: 'x', type: 'uint32' }], // [!code focus]
  [69420]
)
```

### values

- **类型**: [`AbiParametersToPrimitiveTypes<AbiParameter[]>`](/docs/glossary/terms#abiparameterstoprimitivetypes)

与 `params` 中定义的 ABI 类型对应的一组原始值。

```ts
encodeAbiParameters(
  [{ name: 'x', type: 'uint32' }],
  [69420] // [!code focus]
)
```

## 更多示例

### 简单结构体

:::code-group

```ts [example.ts]
import { abi } from './abi'

const encodedData = encodeAbiParameters(
  abi[0].inputs,
  [{
    x: 420n,
    y: true,
    z: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  }],
)
// 0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac
```

```ts [abi.ts]
export const abi = [
  {
    name: 'staticStruct',
    inputs: [
      {
        components: [
          {
            name: 'x',
            type: 'uint256',
          },
          {
            name: 'y',
            type: 'bool',
          },
          {
            name: 'z',
            type: 'address',
          },
        ],
        name: 'foo',
        type: 'tuple',
      },
    ],
  }
] as const
```

```solidity [Example.sol]
contract Example {
  struct Foo {
    uint256 x;
    bool y;
    address z;
  }

  function staticStruct(Foo calldata foo) { ... }
}
```

:::