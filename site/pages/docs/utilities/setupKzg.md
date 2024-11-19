---
description: 设置并返回 KZG 接口。
---

# setupKzg

设置并定义一个与 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 兼容的 [KZG 接口](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#How-%E2%80%9Ccomplicated%E2%80%9D-and-%E2%80%9Cnew%E2%80%9D-is-KZG)。KZG 接口用于 blob 交易签名过程，以生成 KZG 承诺和证明。

`setupKzg` 接受一个实现了三个函数的 KZG 接口：

- `loadTrustedSetup`: 用于初始化 KZG 可信设置的函数。
- `blobToKzgCommitment`: 接受一个 blob 并返回其 KZG 承诺的函数。
- `computeBlobKzgProof`: 接受一个 blob 及其承诺，并返回 KZG 证明的函数。

我们推荐的几个 KZG 实现是：
- [c-kzg](https://github.com/ethereum/c-kzg-4844): Node.js 对 c-kzg 的绑定。
- [kzg-wasm](https://github.com/ethereumjs/kzg-wasm): WebAssembly 对 c-kzg 的绑定。

## 导入

```ts twoslash
import { setupKzg } from 'viem'
```

## 用法

```ts twoslash
import * as cKzg from 'c-kzg'
import { setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath)
```

### 可信设置

如上所示，当你设置 KZG 接口时，你需要提供一个可信设置文件。你可以通过 [`viem/node` 入口点](#viemnode-entrypoint) 导入可信设置（如果你使用的引擎支持 Node.js 的 `node:fs` 模块），或者你可以直接通过 [`viem/trusted-setups` 入口点](#viemtrusted-setups-entrypoint) 导入可信设置 `.json` 文件。

Viem 导出以下可信设置：

- `mainnet.json`: 适用于以太坊主网及其测试网（Sepolia、Goerli 等）。
- `minimal.json`: 适用于低资源本地开发测试网和规范测试。

可信设置文件从以太坊 [共识规范库](https://github.com/ethereum/consensus-specs/tree/dev/presets) 中获取。

#### `viem/node` 入口点

Viem 通过 `viem/node` 入口点导出 **可信设置的路径**，旨在与 `setupKzg` 一起使用。

```ts
import {
  mainnetTrustedSetupPath,
  minimalTrustedSetupPath,
} from 'viem/node'
```

#### `viem/trusted-setups` 入口点

或者，你可以直接从 `viem/trusted-setups` 入口点导入 **可信设置** 文件的内容。

```ts
import mainnetTrustedSetup from 'viem/trusted-setups/mainnet.json'
import minimalTrustedSetup from 'viem/trusted-setups/minimal.json'
```

## 返回

`Kzg`

KZG 接口。

## 参数

### kzg

- **类型:** `Kzg & { loadTrustedSetup(path: string): void }`

与 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 兼容的 [KZG 接口](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#How-%E2%80%9Ccomplicated%E2%80%9D-and-%E2%80%9Cnew%E2%80%9D-is-KZG)。

```ts twoslash
import * as cKzg from 'c-kzg' // [!code focus]
import { setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(
  cKzg, // [!code focus]
  mainnetTrustedSetupPath
)
```

### path

- **类型:** `string`

可信设置文件的路径。

```ts twoslash
import * as cKzg from 'c-kzg'
import { setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node' // [!code focus]

const kzg = setupKzg(
  cKzg, 
  mainnetTrustedSetupPath // [!code focus]
)
```