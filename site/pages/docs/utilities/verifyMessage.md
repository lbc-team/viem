---
description: 验证签名消息是否由提供的地址生成。
---

# verifyMessage

验证消息是否由提供的地址签名。

:::warning[警告]
此工具只能验证由外部拥有账户（EOA）签名的消息。
要验证来自合约账户（& EOA）的消息，请使用 [`publicClient.verifyMessage` 操作](/docs/actions/public/verifyMessage)。
:::

## 用法

:::code-group

```ts [example.ts]
import { verifyMessage } from 'viem'
import { account, walletClient } from './client'

const signature = await walletClient.signMessage({
  account,
  message: 'hello world',
})

const valid = await verifyMessage({ // [!code focus:99]
  address: account.address,
  message: 'hello world',
  signature,
})
// true
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
export const account = privateKeyToAccount(...)
```

:::

## 返回值

`boolean`

提供的 `address` 是否生成了 `signature`。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

签署原始消息的以太坊地址。

```ts
const valid = await verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
  message: 'hello world',
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### message

- **类型:** `string`

要验证的消息。

默认情况下，viem 签署消息的 UTF-8 表示。

```ts
const valid = await verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world', // [!code focus:1]
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

要签署消息的数据表示，可以使用 `raw` 属性。

```ts
const valid = await verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### signature

- **类型:** `Hex | ByteArray | Signature`

通过使用地址的私钥签署消息生成的签名。

```ts
const valid = await verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world',
  signature: // [!code focus:2]
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```