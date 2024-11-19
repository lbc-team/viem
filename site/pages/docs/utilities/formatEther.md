---
description: 将数值 wei 转换为以太的字符串表示。
---

# formatEther

将数值 wei 转换为以太的字符串表示。

## 导入

```ts
import { formatEther } from 'viem'
```

## 用法

```ts
import { formatEther } from 'viem'

formatEther(1000000000000000000n) // [!code focus:2]
// '1'
```

## 返回

`string`

## 参数

### value

- **类型:** `bigint`

wei 值。