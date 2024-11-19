---
description: 将字符串、十六进制值、数字或布尔值编码为字节数组。
---

# toBytes

将字符串、十六进制值、数字或布尔值编码为字节数组。

快捷函数：

- [hexToBytes](#hextobytes)
- [stringToBytes](#stringtobytes)
- [numberToBytes](#numbertobytes)
- [boolToBytes](#booltobytes)

## 导入

```ts
import { toBytes } from 'viem'
```

## 用法

```ts
import { toBytes } from 'viem'

toBytes('Hello world')
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])

toBytes('0x48656c6c6f20576f726c6421')
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])

toBytes(420)
// Uint8Array([1, 164])

toBytes(true)
// Uint8Array([1])
```

## 返回

`ByteArray`

字节数组表示为 `Uint8Array`。

## 参数

### value

- **类型:** `string | Hex`

要编码为字节的值。

```ts 
toBytes(
  'Hello world' // [!code focus]
)
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
```

### options

```ts 
toBytes(
  'Hello world', 
  { size: 32 } // [!code focus]
)
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
```

## 快捷函数

### hexToBytes

- **类型:** `Hex`

将十六进制值编码为字节数组。

```ts
import { hexToBytes } from 'viem'

hexToBytes('0x48656c6c6f20576f726c6421') // [!code focus:2]
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])

hexToBytes('0x48656c6c6f20576f726c6421', { size: 32 }) // [!code focus:2]
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
```

### stringToBytes

- **类型:** `Hex`

将字符串编码为字节数组。

```ts
import { stringToBytes } from 'viem'

stringToBytes('Hello world') // [!code focus:2]
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])

stringToBytes('Hello world', { size: 32 }) // [!code focus:2]
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
```

### numberToBytes

- **类型:** `number | bigint`

将数字编码为字节数组。

```ts
import { numberToBytes } from 'viem'

numberToBytes(420) // [!code focus:2]
// Uint8Array([1, 164])

numberToBytes(420, { size: 32 }) // [!code focus:2]
// Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 164])
```

### boolToBytes

- **类型:** `boolean`

将布尔值编码为字节数组。

```ts
import { boolToBytes } from 'viem'

boolToBytes(true) // [!code focus:2]
// Uint8Array([1])

boolToBytes(true, { size: 32 }) // [!code focus:2]
// Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
```