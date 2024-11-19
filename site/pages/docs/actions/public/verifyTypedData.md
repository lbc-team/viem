---
description: 验证已签名的类型化数据
---

# verifyTypedData

验证提供的地址是否签署了类型化数据。

:::info 
**我为什么要使用这个而不是 [`verifyTypedData`](/docs/utilities/verifyTypedData) 工具？**

此操作支持验证由智能合约账户或外部拥有账户（通过 [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492)）签署的类型化数据。 [`verifyTypedData`](/docs/utilities/verifyTypedData) 工具仅支持外部拥有账户。随着越来越多的钱包实现 [账户抽象](https://eips.ethereum.org/EIPS/eip-4337)，这变得越来越重要。
:::

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient, publicClient } from './client'
import { domain, types } from './data'

const message = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
}

const signature = await walletClient.signTypedData({
  account,
  domain,
  types,
  primaryType: 'Mail',
  message,
})
// [!code focus:99]
const valid = await publicClient.verifyTypedData({
  address: account.address,
  domain,
  types,
  primaryType: 'Mail',
  message,
  signature,
})
// true
```

```ts twoslash [data.ts] filename="data.ts"
// 域上的所有属性都是可选的
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// 所有类型定义的命名列表
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
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
const valid = await publicClient.verifyTypedData({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

### domain

**类型:** `TypedDataDomain`

类型化数据域。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: { // [!code focus:6]
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

### types

类型化数据的类型定义。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: { // [!code focus:11]
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

### primaryType

**类型:** 推断的 `string`。

要从 `types` 中提取并在 `value` 中使用的主要类型。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: { 
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [ // [!code focus:5]
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', // [!code focus]
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

### message

**类型:** 从 `types` 和 `primaryType` 推断。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: { // [!code focus:11]
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

### signature

- **类型:** `Hex | ByteArray | Signature`

已签名数据的签名。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...', // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `bigint`

仅在验证由智能合约账户签名的已签名数据时使用。检查合约是否已部署的区块号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  blockNumber: 42069n, // [!code focus]
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

仅在验证由智能合约账户签名的已签名数据时使用。检查合约是否已部署的区块标签。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const valid = await publicClient.verifyTypedData({
  blockNumber: 42069n, // [!code focus]
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  signature: '0x...',
})
```

## JSON-RPC 方法

[`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call) 到一个无部署的 [通用签名验证合约](https://eips.ethereum.org/EIPS/eip-6492)。