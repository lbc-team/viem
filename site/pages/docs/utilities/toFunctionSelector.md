---
description: 返回给定函数定义的函数选择器（4 字节编码）。
---

# toFunctionSelector

返回给定函数定义的函数选择器（4 字节编码）。

## 安装

```ts
import { toFunctionSelector } from 'viem'
```

## 用法

```ts twoslash
import { toFunctionSelector } from 'viem'

const selector_1 = toFunctionSelector('function ownerOf(uint256 tokenId)')
// @log: 输出: 0x6352211e

const selector_2 = toFunctionSelector('ownerOf(uint256)')
// @log: 输出: 0x6352211e

// 或者从合约 ABI 中的 `AbiFunction`
const selector_3 = toFunctionSelector({
  name: 'ownerOf',
  type: 'function',
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  outputs: [],
  stateMutability: 'view',
})
// @log: 输出: 0x6352211e
```

## 返回值

[`Hex`](/docs/glossary/types#hex)

选择器作为十六进制值。

## 参数

### function

- **类型:** `string |`[`AbiFunction`](https://abitype.dev/api/types#abifunction)

要生成选择器的函数。