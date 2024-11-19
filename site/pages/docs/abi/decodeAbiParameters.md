# decodeAbiParameters [解码 ABI 编码数据]

使用 [ABI 规范](https://solidity.readthedocs.io/en/latest/abi-spec) 解码 ABI 编码数据，给定一组 ABI 参数（`inputs`/`outputs`）和编码的 ABI 数据。

`decodeAbiParameters` 函数被其他合约解码工具（即 `decodeFunctionData`、`decodeEventLog` 等）使用。

## 安装

```ts
import { decodeAbiParameters } from 'viem'
```

## 用法

`decodeAbiParameters` 函数接受两个参数：

- 一组 ABI 参数（`params`），可以是 ABI 项的 `inputs` 或 `outputs` 属性的形状。
- 与给定 `params` 对应的 ABI 编码数据（`data`）。

```ts
import { decodeAbiParameters } from 'viem'

const values = decodeAbiParameters(
  [
    { name: 'x', type: 'string' },
    { name: 'y', type: 'uint' },
    { name: 'z', type: 'bool' }
  ],
  '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000',
)
// ['wagmi', 420n, true]
```

### 可读性

你还可以使用 [`parseAbiParameters` 工具](/docs/abi/parseAbiParameters) 传入 [可读性](/docs/glossary/terms#human-readable-abi) 参数。

```ts
import { decodeAbiParameters, parseAbiParameters } from 'viem'

const values = decodeAbiParameters(
  parseAbiParameters('string x, uint y, bool z'),
  '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'
)
// ['wagmi', 420n, true]
```

## 返回值

解码后的数据。类型从 ABI 中推断。

## 参数

### params

- **类型**: [`AbiParameter[]`](/docs/glossary/types#abiparameter)

要解码的 ABI 参数集，形状与 ABI 事件/函数的 `inputs` 或 `outputs` 属性相同。

这些参数必须包含有效的 [ABI 类型](https://docs.soliditylang.org/en/develop/abi-spec#types)。

```ts
const values = decodeAbiParameters(
  [{ name: 'x', type: 'uint32' }], // [!code focus]
  '0x0000000000000000000000000000000000000000000000000000000000010f2c',
)
```

### data

- **类型**: [`Hex`](/docs/glossary/types#hex)

ABI 编码数据。

```ts
const values = decodeAbiParameters(
  [{ name: 'x', type: 'uint32' }],
  '0x0000000000000000000000000000000000000000000000000000000000010f2c', // [!code focus]
)
```

## 更多示例

### 简单结构体

:::code-group

```ts [example.ts]
import { abi } from './abi'

const values = decodeAbiParameters(
  abi[0].outputs,
  '0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac',
)
// { x: 420n, y: true, z: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC' }
```

```ts [abi.ts]
export const abi = [
  {
    name: 'staticStruct',
    outputs: [
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

  function staticStruct(...) returns (Foo calldata foo) { 
    ... 
    return foo;
  }
}
```

:::