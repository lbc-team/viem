---
description: 检查值是否为字节数组。
---

# isBytes

检查值是否为字节数组。

## 安装

```ts
import { isBytes } from 'viem'
```

## 用法

```ts
import { isBytes } from 'viem'

isBytes(new Uint8Array([1, 69, 420]))
// true

isBytes([1, 69, 420])
// false
```

## 返回

`boolean`

如果值是字节数组，则返回真值。