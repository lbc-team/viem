---
description: 生成随机的 EIP-4361 随机数。
---

# generateSiweNonce

生成随机的 [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 随机数。

## 导入

```ts twoslash
import { generateSiweNonce } from 'viem/siwe'
```

## 用法

```ts twoslash
import { generateSiweNonce } from 'viem/siwe'

const nonce = generateSiweNonce()
```

## 返回

`string`

一个随机生成的 EIP-4361 随机数。