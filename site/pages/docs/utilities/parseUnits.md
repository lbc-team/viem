---
description: 将数字的字符串表示形式乘以给定的 10 的指数。
---

# parseUnits

将数字的字符串表示形式乘以给定的 10 的指数 (10<sup>exponent</sup>)。

## 导入

```ts
import { parseUnits } from 'viem'
```

## 用法

```ts
import { parseUnits } from 'viem'

parseUnits('420', 9) // [!code focus:2]
// 420000000000n
```

## 返回

`bigint`

## 参数

### value

- **类型:** `string`

要乘以的数字的字符串表示形式。

### exponent 

- **类型:** `number`

指数。