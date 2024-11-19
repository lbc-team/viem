---
description: 将 gwei 的字符串表示转换为数值 wei。
---

# parseGwei

将 gwei 的字符串表示转换为数值 wei。

## 导入

```ts
import { parseGwei } from 'viem'
```

## 用法

```ts
import { parseGwei } from 'viem'

parseGwei('420') // [!code focus:2]
// 420000000000n
```

## 返回

`bigint`

## 参数

### value

- **类型:** `string`

gwei 的字符串表示。