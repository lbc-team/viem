---
description: 将数值 wei 转换为 gwei 的字符串表示。
---

# formatGwei

将数值 wei 转换为 gwei 的字符串表示。

## 导入

```ts
import { formatGwei } from 'viem'
```

## 用法

```ts
import { formatGwei } from 'viem'

formatGwei(1000000000n) // [!code focus:2]
// '1'
```

## 返回

`string`

## 参数

### value

- **类型:** `bigint`

wei 值。