---
description: 将任意数据转换为 blobs。
---

# toBlobs

将任意数据转换为 Viem 形状的 blobs。

:::warning
此函数将数据转换为 Viem 形状的 blobs。它旨在与 Viem 的 `fromBlobs` 函数一起使用，以便将数据转换回原始格式。
:::

## 导入

```ts twoslash
import { toBlobs } from 'viem'
```

## 用法

```ts twoslash [example.ts]
import { toBlobs } from 'viem'

const blobs = toBlobs({ data: '0x...' })
```

## 返回值

`Hex[] | ByteArray[]`

从输入数据生成的 blobs。

## 参数

### data

- **类型:** `Hex | ByteArray`

要转换为 blobs 的数据。

```ts twoslash
import { toBlobs } from 'viem'

const blobs = toBlobs({ 
  data: '0x...' // [!code focus]
})
```

### to

- **类型:** `"bytes" | "hex"`

输出类型。

```ts twoslash
import { toBlobs } from 'viem'

const blobs = toBlobs({ 
  data: '0x...',
  to: 'bytes' // [!code focus]
})

blobs // [!code focus]
// ^?
```