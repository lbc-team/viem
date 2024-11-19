---
description: 将 blobs 转换为原始数据。
---

# fromBlobs

将 Viem 形状的 blobs 转换为原始数据。

:::warning
此函数将数据从 Viem 形状的 blobs 转换。它旨在与 Viem 的 `toBlobs` 函数一起使用，以将任意数据转换为 blobs。
:::

## 导入

```ts twoslash
import { fromBlobs } from 'viem'
```

## 用法

```ts twoslash [example.ts]
import { fromBlobs } from 'viem'

const data = fromBlobs({ blobs: ['0x...'] })
```

## 返回值

`Hex | ByteArray`

从 blobs 中提取的数据。

## 参数

### blobs

- **类型:** `Hex[] | ByteArray[]`

将 blobs 转换为原始数据。

```ts twoslash
import { fromBlobs } from 'viem'

const data = fromBlobs({ 
  blobs: ['0x...'] // [!code focus]
})
```

### to

- **类型:** `"bytes" | "hex"`

输出类型。

```ts twoslash
import { fromBlobs } from 'viem'

const data = fromBlobs({ 
  blobs: ['0x...'],
  to: 'bytes' // [!code focus]
})

data // [!code focus]
// ^?
```