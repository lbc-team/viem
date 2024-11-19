---
description: 返回给定起始/结束字节偏移的十六进制或字节数组的一部分。
---

# slice

返回给定起始/结束字节偏移的十六进制或字节数组的一部分。

## 安装

```ts
import { slice } from 'viem'
```

## 用法

```ts
import { slice } from 'viem'

slice('0x0123456789', 1, 4)
// 0x234567

slice(new Uint8Array([1, 122, 51, 123]), 1, 3)
// Uint8Array [122, 51]
```

## 返回

`Hex | ByteArray`

切片值的部分。

## 参数

### value

- **类型:** `Hex | ByteArray`

要切片的十六进制或字节数组。

```ts
slice(
  '0x0123456789', // [!code focus]
  1,
  4
)
```

### start (可选)

- **类型:** `number`

起始偏移量（以字节为单位）。

```ts
slice(
  '0x0123456789', 
  1 // [!code focus]
)
```

### end (可选)

- **类型:** `number`

结束偏移量（以字节为单位）。

```ts
slice(
  '0x0123456789', 
  1,
  4 // [!code focus]
)
```

#### options.strict (可选)

- **类型:** `boolean`
- **默认:** `false`

结束偏移量是否应包含数据的边界。

```ts
slice('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678', 0, 20, { strict: true })
// [SliceOffsetOutOfBoundsError] 切片结束于偏移量 "20" 超出范围（大小: 19）。

slice('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', 0, 20, { strict: true })
// 0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC
```