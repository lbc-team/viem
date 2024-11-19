---
description: 从 ABI 数组中检索项目。
---

# getAbiItem

从 ABI 中检索项目。

## 导入

```ts
import { getAbiItem } from 'viem'
```

## 用法

```ts
import { getAbiItem } from 'viem'

const encodedData = getAbiItem({
  abi: [
    { 
      name: 'x', 
      type: 'function', 
      inputs: [{ type: 'uint256' }], 
      outputs: [],
      stateMutability: 'payable'
    },
    { 
      name: 'y', 
      type: 'event', 
      inputs: [{ type: 'address' }], 
      outputs: [{ type: 'uint256' }],
      stateMutability: 'view'
    },
    { 
      name: 'z', 
      type: 'function', 
      inputs: [{ type: 'string' }],
      outputs: [{ type: 'uint256' }],
      stateMutability: 'view'
    }
  ],
  name: 'y',
})
/**
 * { 
 *  name: 'y', 
 *  type: 'event', 
 *  inputs: [{ type: 'address' }], 
 *  outputs: [{ type: 'uint256' }],
 *  stateMutability: 'view'
 * }
 */
```

## 返回

`AbiItem`

ABI 项目。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const encodedData = getAbiItem({
  abi: [...], // [!code focus]
  name: 'x',
})
```

### name

- **类型:** `string`

要提取的 ABI 项目的名称。

```ts
const encodedData = getAbiItem({
  abi: [...],
  name: 'x', // [!code focus]
})
```

你还可以提供 ABI 项目的 4 字节选择器：

```ts
const encodedData = getAbiItem({
  abi: [...],
  name: '0x70a08231', // [!code focus]
})
```

### args（可选）

- **类型:** 推断。

可选参数以识别函数重载。

```ts
const encodedData = getAbiItem({
  abi: [...],
  name: 'y',
  args: ['0x0000000000000000000000000000000000000000'], // [!code focus]
})
```