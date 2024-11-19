---
description: 生成 ABI 编码数据。
---

# encodePacked

生成给定一组与打包编码兼容的 Solidity 类型的 [ABI 非标准打包编码数据](https://docs.soliditylang.org/en/v0.8.18/abi-spec#non-standard-packed-mode)。

## 导入

```ts
import { encodePacked } from 'viem'
```

## 用法

```ts
encodePacked(
  ['address', 'string', 'bytes16[]'], 
  [
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 
    'hello world',
    ['0xdeadbeefdeadbeefdeadbeefdeadbeef', '0xcafebabecafebabecafebabecafebabe']
  ]
)
// 0xd8da6bf26964af9d7eed9e03e53415d37aa9604568656c6c6f20776f726c64deadbeefdeadbeefdeadbeefdeadbeef00000000000000000000000000000000cafebabecafebabecafebabecafebabe00000000000000000000000000000000
```

## 返回

[`Hex`](/docs/glossary/types#hex)

编码的打包数据。

## 参数

### types

- **类型**: `PackedAbiType[]`

要打包编码的 ABI 类型集合。

```ts
encodePacked(
  ['address', 'string', 'bytes16[]'], // [!code focus]
  [
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 
    'hello world',
    ['0xdeadbeefdeadbeefdeadbeefdeadbeef', '0xcafebabecafebabecafebabecafebabe']
  ]
)
```

### values

- **类型**: [`AbiParametersToPrimitiveTypes<PackedAbiType[]>`](/docs/glossary/terms#abiparameterstoprimitivetypes)

与 `types` 中定义的 ABI 类型对应的原始值集合。

```ts
encodePacked(
  ['address', 'string', 'bytes16[]'],
  [ // [!code focus:5]
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 
    'hello world',
    ['0xdeadbeefdeadbeefdeadbeefdeadbeef', '0xcafebabecafebabecafebabecafebabe']
  ]
)
```