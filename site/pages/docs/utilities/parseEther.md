---
description: 将以太的字符串表示转换为数值 wei。
---

# parseEther

将以太的字符串表示转换为数值 wei。

## 导入

```ts
import { parseEther } from 'viem'
```

## 用法

```ts
import { parseEther } from 'viem'

parseEther('420') // [!code focus:2]
// 420000000000000000000n
```

## 返回

`bigint`

## 参数

### value

- **类型:** `string`

以太的字符串表示。