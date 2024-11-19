---
description: 将字符串、数字、布尔值或字节数组编码为十六进制值。
---

# toHex

将字符串、数字、布尔值或字节数组编码为十六进制值。

快捷函数：

- [numberToHex](#numbertohex)
- [stringToHex](#stringtohex)
- [bytesToHex](#bytestohex)
- [boolToHex](#booltohex)

## 导入

```ts
import { toHex } from 'viem'
```

## 用法

```ts
import { toHex } from 'viem'

toHex(420)
// "0x1a4"

toHex('Hello world')
// "0x48656c6c6f20776f726c642e"

toHex(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
)
// "0x48656c6c6f20576f726c6421"

toHex(true)
// "0x1"
```

## 返回

[`Hex`](/docs/glossary/types#hex)

十六进制值。

## 参数

### value

- **类型:** `string | number | bigint | ByteArray`

要进行十六进制编码的值。

```ts 
toHex(
  'Hello world' // [!code focus]
)
// '0x48656c6c6f20776f726c642e'
```

### options

```ts 
toHex(
  'Hello world', 
  { size: 32 } // [!code focus]
)
// '0x48656c6c6f20776f726c642e0000000000000000000000000000000000000000'
```

## 快捷函数

### numberToHex

- **类型:** `number | bigint`

将数字值编码为十六进制值。

```ts
import { numberToHex } from 'viem'

numberToHex(420)
// "0x1a4"

numberToHex(4206942069420694206942069420694206942069n)
// "0xc5cf39211876fb5e5884327fa56fc0b75"

numberToHex(420, { size: 32 })
// "0x00000000000000000000000000000000000000000000000000000000000001a4"

numberToHex(4206942069420694206942069420694206942069n, { size: 32 })
// "0x0000000000000000000000000000000c5cf39211876fb5e5884327fa56fc0b75"
```

### stringToHex

- **类型:** `string`

将 UTF-8 字符串值编码为十六进制值。

```ts
import { stringToHex } from 'viem'

stringToHex('Hello World!')
// "0x48656c6c6f20576f726c6421"

stringToHex('Hello World!', { size: 32 })
// "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
```

### bytesToHex

- **类型:** `ByteArray`

将字节数组编码为十六进制值。

```ts
import { bytesToHex } from 'viem'

bytesToHex(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]),
)
// "0x48656c6c6f20576f726c6421"

bytesToHex(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]),
  { size: 32 }
)
// "0x48656c6c6f20576f726c64210000000000000000000000000000000000000000"
```

### boolToHex

- **类型:** `boolean`

将布尔值编码为十六进制值。

```ts
import { boolToHex } from 'viem'

boolToHex(true)
// "0x1"

boolToHex(true, { size: 32 })
// "0x0000000000000000000000000000000000000000000000000000000000000001"
```