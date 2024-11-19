---
description: 从消息和签名中恢复签名地址。
---

# recoverMessageAddress

从消息和签名中恢复原始签名地址。

用于获取使用 [`signMessage`](/docs/actions/wallet/signMessage) 签名的消息的地址。

## 用法

:::code-group

```ts [example.ts]
import { recoverMessageAddress } from 'viem';
import { account, walletClient } from './config'
 
const signature = await walletClient.signMessage({
  account,
  message: 'hello world',
})

const address = await recoverMessageAddress({ // [!code focus:99]
  message: 'hello world',
  signature,
})
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const walletClient = createWalletClient({
  transport: custom(window.ethereum)
})

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses()
// 本地账户
export const account = privateKeyToAccount('0x...')
```

:::

## 返回

[`Address`](/docs/glossary/types#address)

签名地址。

## 参数

### message

- **类型:** `string | { raw: Hex | ByteArray }`

被签名的消息。

默认情况下，viem 验证消息的 UTF-8 表示。

```ts
const address = await recoverMessageAddress({ 
  message: 'hello world', // [!code focus]
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c'
})
```

要验证消息的数据表示，可以使用 `raw` 属性。

```ts
const address = await recoverMessageAddress({ 
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c'
})
```

### signature

- **类型:** `Hex | ByteArray | Signature`

消息的签名。

```ts
const address = await recoverMessageAddress({ 
  message: 'hello world',
  signature: '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c' // [!code focus]
})
```