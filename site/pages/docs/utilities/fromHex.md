---
description: 将十六进制值解码为字符串、数字或字节数组。
---

# fromHex

将十六进制值解码为字符串、数字或字节数组。

快捷函数：

- [hexToNumber](#hextonumber)
- [hexToBigInt](#hextobigint)
- [hexToString](#hextostring)
- [hexToBytes](#hextobytes)
- [hexToBool](#hextobool)

## 导入

```ts
import { fromHex } from 'viem'
```

## 用法

```ts
import { fromHex } from 'viem'

fromHex('0x1a4', 'number')
// 420

fromHex('0xc5cf39211876fb5e5884327fa56fc0b75', 'bigint')
// 4206942069420694206942069420694206942069n

fromHex('0x48656c6c6f20776f726c642e', 'string')
// "Hello world"

fromHex('0x48656c6c6f20576f726c6421', 'bytes')
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])

fromHex('0x1', 'boolean')
// true
```

## 返回

`string | bigint | number | ByteArray`

目标类型。

## 参数

### hex

- **类型:** `Hex`

要解码的十六进制值。

### toOrOptions

- **类型:** `"string" | "hex" | "number" | "bigint" | "boolean" | Options`

输出类型或选项。

```ts 
fromHex(
  '0x48656c6c6f20776f726c642e', 
  'string' // [!code focus]
)
// 'Hello world'
```

```ts 
fromHex(
  '0x48656c6c6f20776f726c642e0000000000000000000000000000000000000000', 
  { // [!code focus]
    size: 32, // [!code focus]
    to: 'string' // [!code focus]
  } // [!code focus]
)
// 'Hello world'
```

## 快捷函数

### hexToNumber

- **类型:** `Hex`

将十六进制值解码为数字。

```ts
import { hexToNumber } from 'viem'

hexToNumber('0x1a4')
// 420

hexToNumber(
  '0x00000000000000000000000000000000000000000000000000000000000001a4', 
  { size: 32 }
)
// 420
```

### hexToBigInt

- **类型:** `Hex`

将十六进制值解码为 bigint。

```ts
import { hexToBigInt } from 'viem'

hexToBigInt('0xc5cf39211876fb5e5884327fa56fc0b75')
// 4206942069420694206942069420694206942069n

hexToBigInt(
  '0x0000000000000000000000000000000c5cf39211876fb5e5884327fa56fc0b75', 
  { size: 32 }
)
// 4206942069420694206942069420694206942069n
```

### hexToString

- **类型:** `Hex`

将十六进制值解码为字符串。

```ts
import { hexToString } from 'viem'

hexToString('0x48656c6c6f20576f726c6421')
// "Hello World!"

hexToString(
  '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000',
  { size: 32 }
)
// "Hello World!"
```

### hexToBytes

- **类型:** `Hex`

将十六进制值解码为字节数组。

```ts
import { hexToBytes } from 'viem'

hexToBytes('0x48656c6c6f20576f726c6421')
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])

hexToBytes(
  '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000',
  { size: 32 }
)
// Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
```

### hexToBool

- **类型:** `Hex`

将十六进制值解码为布尔值。

```ts
import { hexToBool } from 'viem'

hexToBool('0x1')
// true

hexToBool(
  '0x00000000000000000000000000000000000000000000000000000000000001',
  { size: 32 }
)
// true
```