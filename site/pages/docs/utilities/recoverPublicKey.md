---
description: 从哈希和签名恢复签名公钥。
---

# recoverPublicKey

从哈希和签名恢复原始的 64 字节签名公钥。

## 用法

```ts [example.ts]
import { recoverPublicKey } from 'viem'
 
const publicKey = await recoverPublicKey({
  hash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68',
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c'
})
// 0x048318535b54105d4a7aae60c08fc45f9687181b4fdfc625bd1a753fa7397fed753547f11ca8696646f2f3acb08e31016afac23e630c5d11f59f61fef57b0d2aa5
```

## 返回

[`Hex`](/docs/glossary/types#hex)

签名公钥。

## 参数

### hash

- **类型:** `string`

被签名的哈希。

```ts
const publicKey = await recoverPublicKey({ 
  hash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68', // [!code focus]
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c'
})
```

### signature

- **类型:** `Hex | ByteArray | Signature`

哈希的签名。

```ts
const publicKey = await recoverPublicKey({ 
  hash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68',
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c' // [!code focus]
})
```