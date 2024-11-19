---
description: 计算字节数组的 Ripemd160 哈希值。
---

# ripemd160

计算字节数组或十六进制值的 [Ripemd160](https://en.wikipedia.org/wiki/RIPEMD) 哈希值。

此函数是从 [`@noble/hashes`](https://github.com/paulmillr/noble-hashes) 重新导出的 `ripemd160` – 一个经过审计的最小化 JS 哈希库。

## 安装

```ts
import { ripemd160 } from 'viem'
```

## 用法

```ts
import { ripemd160 } from 'viem'

ripemd160(new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
// 0x8476ee4631b9b30ac2754b0ee0c47e161d3f724c

ripemd160('0xdeadbeef')
// 0x226821c2f5423e11fe9af68bd285c249db2e4b5a
```

## 返回值

`Hex | ByteArray`

哈希值。

## 参数

### value

- **类型:** `Hex | ByteArray`

要哈希的十六进制值或字节数组。

### to

- **类型:** `"bytes" | "hex"`
- **默认值:** `"hex"`

输出类型。

```ts
import { ripemd160 } from 'viem'

ripemd160(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33],
  'bytes' // [!code focus]
)
// Uint8Array [132, 118, 238, 70, 49, 185, 179, 10, 194, 117, 75, 14, 224, 196, 126, 22, 29, 63, 114, 76] // [!code focus]
```