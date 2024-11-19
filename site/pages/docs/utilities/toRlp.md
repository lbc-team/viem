---
description: 将十六进制值或字节数组编码为 RLP 编码值。
---

# toRlp

将十六进制值或字节数组编码为 [递归长度前缀 (RLP)](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/) 编码值。

## 导入

```ts
import { toRlp } from 'viem'
```

## 用法

```ts
import { toRlp } from 'viem'

toRlp('0x123456789')
// "0x850123456789"

toRlp(['0x7f', '0x7f', '0x8081e8'])
// "0xc67f7f838081e8"

toRlp(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))
// "0x89010203040506070809"

toRlp('0x123456789', 'bytes')
// Uint8Array [133, 1, 35, 69, 103, 137]
```

## 返回

`Hex | ByteArray`

十六进制值或字节数组。

## 参数

### value

- **类型:** `Hex | ByteArray`

要进行 RLP 编码的值。

### to

- **类型:** `"bytes" | "hex"`
- **默认:** `"hex"`

输出类型。

```ts
toRlp('0x123456789', 'bytes')
// Uint8Array [133, 1, 35, 69, 103, 137]
```