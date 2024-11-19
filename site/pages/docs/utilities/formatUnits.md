---
description: 将一个数字除以给定的 10 的指数，并将其格式化为数字的字符串表示。
---

# formatUnits

将一个数字除以给定的 10 的指数 (10<sup>exponent</sup>)，并将其格式化为数字的字符串表示。

## 导入

```ts
import { formatUnits } from 'viem'
```

## 用法

```ts
import { formatUnits } from 'viem'

formatUnits(420000000000n, 9) // [!code focus:2]
// '420'
```

## 返回

`string`

## 参数

### value

- **类型:** `bigint`

要除的数字。

### exponent 

- **类型:** `number`

指数。