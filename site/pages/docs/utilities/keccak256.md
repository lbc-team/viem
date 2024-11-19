---
description: 计算字节数组的 Keccak256 哈希值。
---

# keccak256

计算字节数组或十六进制值的 [Keccak256](https://en.wikipedia.org/wiki/SHA-3) 哈希值。

此函数是 [`@noble/hashes`](https://github.com/paulmillr/noble-hashes) 中 `keccak_256` 的重新导出 – 一个经过审计的最小化 JS 哈希库。

## 安装

```ts
import { keccak256 } from 'viem'
```

## 用法

```ts
import { keccak256 } from 'viem'

keccak256(new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33])
// 0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0

keccak256('0xdeadbeef')
// 0xd4fd4e189132273036449fc9e11198c739161b4c0116a9a2dccdfa1c492006f1

// 哈希 utf-8 字符串
keccak256(toHex('hello world'))
// 0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0
```

## 返回

`Hex | ByteArray`

哈希值。

## 参数

### value

- **类型:** `Hex | ByteArray`

要哈希的十六进制值或字节数组。

### to

- **类型:** `"bytes" | "hex"`
- **默认:** `"hex"`

```ts
import { keccak256 } from 'viem'

keccak256(
  new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33],
  'bytes' // [!code focus]
)
// Uint8Array [62, 162, 241, 208, 171, 243, 252, 102, 207, 41, 238, 187, 112, 203, 212, 231, 254, 118, 46, 248, 160, 155, 204, 6, 200, 237, 246, 65, 35, 10, 254, 192] // [!code focus]
```