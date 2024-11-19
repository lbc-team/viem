---
description: 验证签名消息是否由提供的地址生成。
---

# verifyMessage

验证消息是否由提供的地址签名。

:::info
**我为什么要使用这个而不是 [`verifyMessage`](/docs/utilities/verifyMessage) 工具？**

此操作支持验证由智能合约账户或外部拥有账户签名的消息。 [`verifyMessage`](/docs/utilities/verifyMessage.md) 工具仅支持外部拥有账户。随着越来越多的钱包实现 [账户抽象](https://eips.ethereum.org/EIPS/eip-4337)，这变得越来越重要。
:::

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient, publicClient } from './client'

const signature = await walletClient.signMessage({
  account,
  message: 'hello world',
})
// [!code focus:99]
const valid = await publicClient.verifyMessage({
  address: account.address,
  message: 'hello world',
  signature,
})
// @log: true
```

```ts twoslash [client.ts] filename="client.ts"
import 'viem/window'
// ---cut---
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClient = createWalletClient({
  transport: custom(window.ethereum!)
})

// @log: ↓ JSON-RPC 账户
export const [account] = await walletClient.getAddresses()

// @log: ↓ 本地账户
// export const account = privateKeyToAccount(...)
```

:::

## 返回值

`boolean`

签名消息是否对给定地址有效。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

签署原始消息的以太坊地址。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
  message: 'hello world',
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### message

- **类型:** `string`

要验证的消息。

默认情况下，viem 验证消息的 UTF-8 表示。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world', // [!code focus:1]
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

要验证消息的数据表示，可以使用 `raw` 属性。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### signature

- **类型:** `Hex | ByteArray | Signature`

通过使用地址的签名者签署消息生成的签名。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world',
  signature: // [!code focus:2]
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c', 
})
```

### blockNumber (可选)

- **类型:** `bigint`

仅在验证由智能合约账户签署的消息时使用。检查合约是否已部署的区块号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyMessage({
  blockNumber: 42069n, // [!code focus]
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world',
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

仅在验证由智能合约账户签署的消息时使用。检查合约是否已部署的区块标签。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyMessage({
  blockTag: 'safe', // [!code focus]
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world',
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

## JSON-RPC 方法

[`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) 到一个无部署的 [通用签名验证合约](https://eips.ethereum.org/EIPS/eip-6492)。