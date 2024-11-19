---
description: 连接一组十六进制值或字节数组。
---

# concat

连接一组十六进制值或字节数组。

## Install

```ts
import { concat } from 'viem'
```

## Usage

```ts
import { concat } from 'viem'

concat(['0x00000069', '0x00000420'])
// 0x0000006900000420

concat([new Uint8Array([69]), new Uint8Array([420])])
// Uint8Array [69, 420]
```

## Returns

`Hex | ByteArray`

连接后的值。