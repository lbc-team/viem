---
description: 从哈希和签名中恢复签名地址。
---

# recoverAddress

从哈希和签名中恢复原始签名地址。

## 用法

```ts [example.ts]
import { recoverAddress } from 'viem'
 
const address = await recoverAddress({
  hash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68',
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c'
})
// 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

## 返回

[`Address`](/docs/glossary/types#address)

签名地址。

## 参数

### hash

- **类型:** `string`

被签名的哈希。

```ts
const address = await recoverAddress({ 
  hash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68', // [!code focus]
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c'
})
```

### signature

- **类型:** `Hex | ByteArray | Signature`

哈希的签名。

```ts
const address = await recoverAddress({ 
  hash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68',
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c' // [!code focus]
})
```