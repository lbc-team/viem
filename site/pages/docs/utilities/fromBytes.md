---
description: 解码字节数组为字符串、十六进制值、布尔值或数字。
---

# fromBytes

解码字节数组为字符串、十六进制值、布尔值或数字。

快捷函数：

- [bytesToHex](#bytestohex)
- [bytesToString](#bytestostring)
- [bytesToNumber](#bytestonumber)
- [bytesToBigInt](#bytestobigint)
- [bytesToBool](#bytestobool)

## 导入

```ts
import { fromBytes } from 'viem'
```

## 用法

```ts
import { fromBytes } from 'viem'

fromBytes(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]), 
  'string'
)
// 'Hello world'

fromBytes(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]), 
  'hex'
)
// '0x48656c6c6f20576f726c6421'

fromBytes(new Uint8Array([1, 164]), 'number')
// 420

fromBytes(new Uint8Array([1]), 'boolean')
// true
```

## 返回

`string | Hex | number | bigint | boolean`

目标类型。

## 参数

### value

- **类型:** `ByteArray`

要解码的字节数组。

### toOrOptions

- **类型:** `"string" | "hex" | "number" | "bigint" | "boolean" | Options`

输出类型或选项。

```ts 
fromBytes(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]), 
  'string' // [!code focus]
)
// 'Hello world'
```

```ts 
fromBytes(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 
  { // [!code focus]
    size: 32, // [!code focus]
    to: 'string' // [!code focus]
  } // [!code focus]
)
// 'Hello world'
```

## 快捷函数

### bytesToHex

- **类型:** `Hex`

解码字节数组为十六进制值。

```ts
import { bytesToHex } from 'viem'

bytesToHex( // [!code focus:4]
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
)
// '0x48656c6c6f20576f726c6421'

bytesToHex( // [!code focus:5]
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 
  { size: 32 }
)
// '0x48656c6c6f20576f726c64210000000000000000000000000000000000000000'
```

### bytesToString

- **类型:** `Hex`

解码字节数组为字符串。

```ts
import { bytesToString } from 'viem'

bytesToString( // [!code focus:4]
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
)
// 'Hello world'

bytesToString( // [!code focus:5]
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 
  { size: 32 }
)
// 'Hello world'
```

### bytesToNumber

- **类型:** `number`

解码字节数组为数字。

```ts
import { bytesToNumber } from 'viem'

bytesToNumber(new Uint8Array([1, 164])) // [!code focus:2]
// 420

bytesToNumber( // [!code focus:5]
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 164]), 
  { size: 32 }
)
// 420
```

### bytesToBigInt

- **类型:** `number`

解码字节数组为数字。

```ts
import { bytesToBigInt } from 'viem'

bytesToBigInt( // [!code focus:4]
  new Uint8Array([12, 92, 243, 146, 17, 135, 111, 181, 229, 136, 67, 39, 250, 86, 252, 11, 117])
)
// 4206942069420694206942069420694206942069n

bytesToBigInt( // [!code focus:5]
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 92, 243, 146, 17, 135, 111, 181, 229, 136, 67, 39, 250, 86, 252, 11, 117]),
  { size: 32 }
)
// 4206942069420694206942069420694206942069n
```

### bytesToBool

- **类型:** `boolean`

解码字节数组为布尔值。

```ts
import { bytesToBool } from 'viem'

bytesToBool(new Uint8Array([1])) // [!code focus:2]
// true

bytesToBool( // [!code focus:5]
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
  { size: 32 }
) 
// true
```