---
description: 验证 EIP-4361 格式的消息是否已签名。
---

# verifySiweMessage

验证 [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 格式的消息是否已签名。

有关如何创建 EIP-4361 格式消息的信息，请参见 [`createSiweMessage`](/docs/siwe/utilities/createSiweMessage)。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient, publicClient } from './client'
import { message } from './message'

const signature = await walletClient.signMessage({ account, message })
// [!code focus:99]
const valid = await publicClient.verifySiweMessage({
  message,
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

```ts twoslash [message.ts] filename="message.ts"
// ---cut---
import { createSiweMessage, generateSiweNonce } from 'viem/siwe'
import { mainnet } from 'viem/chains'
import { account } from './client'

export const message = createSiweMessage({
  address: account.address,
  chainId: mainnet.id,
  domain: 'example.com',
  nonce: generateSiweNonce(),
  uri: 'https://example.com/path',
  version: '1',
})
```

:::

## 返回

`boolean`

签名消息是否对给定地址有效。

## 参数

### message

- **类型:** `string`

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 格式的消息待验证。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
import { createSiweMessage, generateSiweNonce } from 'viem/siwe'
// ---cut---
const valid = await publicClient.verifySiweMessage({
  message: createSiweMessage({ // [!code focus:1]
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
    chainId: 1, // [!code focus:1]
    domain: 'example.com', // [!code focus:1]
    nonce: generateSiweNonce(), // [!code focus:1]
    uri: 'https://example.com/path', // [!code focus:1]
    version: '1', // [!code focus:1]
  }), // [!code focus:1]
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### signature

- **类型:** `Hex`

通过使用地址的签名者签名消息生成的签名。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c', // [!code focus:1]
})
```

### address (可选)

- **类型:** `Address`

要检查的以太坊地址。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### blockNumber (可选)

- **类型:** `number`

仅在验证由智能合约账户签名的消息时使用。检查合约是否已部署的区块号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  blockNumber: 42069n, // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

仅在验证由智能合约账户签名的消息时使用。检查合约是否已部署的区块标签。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  blockTag: 'safe', // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### domain (可选)

- **类型:** `string`

[RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) 权限进行检查。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  domain: 'viem.sh', // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### nonce (可选)

- **类型:** `string`

随机字符串进行检查。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
import { generateSiweNonce } from 'viem/siwe'
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  nonce: generateSiweNonce(), // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### scheme (可选)

- **类型:** `string`

[RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) URI 方案进行检查。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  scheme: 'https', // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```

### time (可选)

- **类型:** `Date`
- **默认:** `new Date()`

当前时间用于检查可选的 [`expirationTime`](/docs/siwe/utilities/createSiweMessage#expirationtime-optional) 和 [`notBefore`](/docs/siwe/utilities/createSiweMessage#notbefore-optional) 消息字段。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
declare const message: string
// ---cut---
const valid = await publicClient.verifySiweMessage({
  time: new Date(), // [!code focus:1]
  message,
  signature:
    '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
})
```