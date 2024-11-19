---
description: 返回给定函数定义的哈希（函数签名）。
---

# toFunctionHash

返回给定函数定义的哈希（函数签名）。

## 安装

```ts
import { toFunctionHash } from 'viem'
```

## 用法

```ts twoslash
import { toFunctionHash } from 'viem'

const hash_1 = toFunctionHash('function ownerOf(uint256)')
// @log: 输出: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

// 或者从你的合约 ABI 中的 `AbiEvent`
const hash_2 = toFunctionHash({
  name: 'ownerOf',
  type: 'function',
  inputs: [{ name: 'tokenId', type: 'uint256' }],
  outputs: [],
  stateMutability: 'view',
})
// @log: 输出: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
```

## 返回

[`Hex`](/docs/glossary/types#hex)

函数签名的哈希。

## 参数

### function

- **类型:** `string` | [`AbiFunction`](https://abitype.dev/api/types#abifunction)

要生成哈希的函数。