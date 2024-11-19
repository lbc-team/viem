---
description: 将 RLP 值解码为解码后的十六进制值或字节数组。
---

# fromRlp

将 [递归长度前缀 (RLP)](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp) 值解码为解码后的十六进制值或字节数组。

## 导入

```ts
import { fromRlp } from 'viem'
```

## 用法

```ts
import { fromRlp } from 'viem'

fromRlp('0x850123456789', 'hex')
// "0x123456789"

fromRlp('0xc67f7f838081e8', 'hex')
// ['0x7f', '0x7f', '0x8081e8']

fromRlp('0x89010203040506070809', 'bytes')
//  Uint8Array [1, 2, 3, 4, 5, 6, 7, 8, 9]

fromRlp(new Uint8Array ([133, 1, 35, 69, 103, 137]), 'hex')
// "0x123456789"
```

## 返回

`Hex | ByteArray`

十六进制值或字节数组。

## 参数

### value

- **类型:** `Hex | ByteArray`

要解码的 RLP 值。

### to

- **类型:** `"bytes" | "hex"`

输出类型。