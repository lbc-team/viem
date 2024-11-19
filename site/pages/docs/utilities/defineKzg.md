---
description: 定义 KZG 接口。
---

# defineKzg

定义一个与 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 兼容的 [KZG 接口](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#How-%E2%80%9Ccomplicated%E2%80%9D-and-%E2%80%9Cnew%E2%80%9D-is-KZG)。KZG 接口用于 blob 交易签名过程，以生成 KZG 承诺和证明。

`defineKzg` 接受一个实现了两个函数的 KZG 接口：

- `blobToKzgCommitment`：一个接受 blob 并返回其 KZG 承诺的函数。
- `computeBlobKzgProof`：一个接受 blob 及其承诺并返回 KZG 证明的函数。

我们推荐的几个 KZG 实现是：
- [c-kzg](https://github.com/ethereum/c-kzg-4844)：Node.js 对 c-kzg 的绑定。
- [kzg-wasm](https://github.com/ethereumjs/kzg-wasm)：WebAssembly 对 c-kzg 的绑定。

## 导入

```ts twoslash
import { defineKzg } from 'viem'
```

## 用法

```ts twoslash
import * as cKzg from 'c-kzg'
import { defineKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

cKzg.loadTrustedSetup(mainnetTrustedSetupPath)

const kzg = defineKzg(cKzg)
```

## 返回

`Kzg`

KZG 接口。

## 参数

### blobToKzgCommitment

- **类型：** `(blob: ByteArray) => ByteArray`

将 blob 转换为 KZG 承诺。

### computeBlobKzgProof

- **类型：** `(blob: ByteArray, commitment: ByteArray) => ByteArray`

给定一个 blob，返回用于验证其与承诺的 KZG 证明。