---
description: 将可读的 ABI 解析为 JSON。
---

# parseAbi

将可读的 ABI 解析为 JSON [`Abi`](/docs/glossary/types#abi)。从 [ABIType](https://abitype.dev/api/human#parseabi-1) 重新导出。

## 导入

```ts
import { parseAbi } from 'viem'
```

## 用法

```ts
import { parseAbi } from 'viem'

const abi = parseAbi([
  //  ^? const abi: readonly [{ name: "balanceOf"; type: "function"; stateMutability:...
  'function balanceOf(address owner) view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 amount)',
])
```

## 返回

[`Abi`](/docs/glossary/types#abi)

JSON ABI。

## 参数

### signatures

- **类型:** `string[]`

可读的 ABI。

```ts
import { parseAbi } from 'viem'

const abi = parseAbi([
  //  ^? const abi: readonly [{ name: "balanceOf"; type: "function"; stateMutability:...
  'function balanceOf(address owner) view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 amount)',
])
```