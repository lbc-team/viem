---
description: 解析人类可读的 ABI 项（例如错误、事件、函数）为 ABI 项。
---

# parseAbiItem

解析人类可读的 ABI 项（例如错误、事件、函数）为 ABI 项。重新导出自 [ABIType](https://abitype.dev/api/human#parseabiitem-1)。

## 导入

```ts
import { parseAbiItem } from 'viem'
```

## 用法

```ts
import { parseAbiItem } from 'viem'

const abiItem = parseAbiItem(
  //  ^? const abiItem: { name: "balanceOf"; type: "function"; stateMutability: "view";...
  'function balanceOf(address owner) view returns (uint256)',
)
```

## 返回

[`Abi`](/docs/glossary/types#abi)

解析后的 ABI 项。

## 参数

### signatures

- **类型:** `string[]`

人类可读的 ABI 项。

```ts
import { parseAbiItem } from 'viem'

const abiItem = parseAbiItem([
  //  ^? const abiItem: { name: "foo"; type: "function"; stateMutability: "view"; inputs:...
  'function foo(Baz bar) view returns (string)',
  'struct Baz { string name; }',
])
```