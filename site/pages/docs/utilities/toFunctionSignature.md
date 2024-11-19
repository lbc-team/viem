---
description: 返回给定函数定义的签名。
---

# toFunctionSignature

返回给定函数定义的签名。

:::tip
这仅返回**函数签名**。如果你需要**完整的人类可读定义**，请查看 ABIType 的 [`formatAbiItem`](https://abitype.dev/api/human#formatabiitem-1)。
:::

## 安装

```ts
import { toFunctionSignature } from 'viem'
```

## 用法

```ts twoslash
import { toFunctionSignature } from 'viem'

// 从函数定义
const signature_1 = toFunctionSignature('function ownerOf(uint256 tokenId)')
// @log: 输出: ownerOf(uint256)

// 从合约 ABI 中的 `AbiFunction`
const signature_2 = toFunctionSignature({
  name: 'ownerOf',
  type: 'function',
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  outputs: [],
  stateMutability: 'view',
})
// @log: 输出: ownerOf(uint256)
```

## 返回值

`string`

签名作为字符串值。

## 参数

### definition

- **类型:** `string | AbiFunction`

要生成签名的函数定义。