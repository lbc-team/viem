---
description: 使用 Solady 的 ERC-1271 格式签名类型化数据。
---

# signTypedData

通过 [ERC-7739 `TypedDataSign` 格式](https://eips.ethereum.org/EIPS/eip-7739) 签名 [EIP-712](https://eips.ethereum.org/EIPS/eip-712) 类型化数据。

此操作适用于为实现（或符合）[ERC-7739](https://eips.ethereum.org/EIPS/eip-7739) 的合约（例如 ERC-4337 智能账户）签名消息（例如 Solady 的 [ERC1271.sol](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC1271.sol)）。

使用计算出的签名，你可以使用 [`verifyTypedData`](/docs/actions/public/verifyTypedData) 来验证签名。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient } from './config'
import { domain, types } from './data'
 
const signature = await walletClient.signTypedData({ // [!code focus:99]
  // 用于签名的账户。
  account,
  domain,
  types,
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
  // 验证合约地址（例如 ERC-4337 智能账户）。
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})
```

```ts twoslash [data.ts]
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

```ts twoslash [config.ts] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { erc7739 } from 'viem/experimental'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
}).extend(erc7739())

export const [account] = await walletClient.getAddresses()
// @log: ↑ JSON-RPC 账户

// export const account = privateKeyToAccount(...)
// @log: ↑ 本地账户
```

:::

## 账户和/或验证者提升

如果你不希望将 `account` 和/或 `verifier` 传递给每个 `signTypedData`，你还可以在钱包客户端上提升账户和/或验证者（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#withaccount)。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './config'
import { domain, types } from './data'
 
const signature = await walletClient.signTypedData({ // [!code focus:99]
  domain,
  types,
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
})
```

```ts twoslash [data.ts]
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

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, custom } from 'viem'
import { erc7739 } from 'viem/experimental'

// 从 EIP-1193 提供者检索账户。
const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
})

export const walletClient = createWalletClient({
  account,
  transport: custom(window.ethereum!)
}).extend(erc7739({ 
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' 
}))
```

```ts twoslash [config.ts (本地账户)] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { erc7739 } from 'viem/experimental'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'),
  transport: http()
}).extend(erc7739({ 
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' 
}))
```

:::

## 返回

[`Hex`](/docs/glossary/types#hex)

签名数据。

## 参数

### account

- **类型:** `Account | Address`

用于签名类型化数据的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
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
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})
```

### domain

**类型:** `TypedDataDomain`

类型化数据域。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})
```

### types

类型化数据的类型定义。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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
})
```

### primaryType

**类型:** 推断的 `string`。

要从 `types` 中提取并在 `value` 中使用的主要类型。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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
})
```

### message

**类型:** 从 `types` 和 `primaryType` 推断。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})
```

### verifier

- **类型:** `地址`

验证合约的地址（例如，ERC-4337 智能账户）。如果未传递 `verifierDomain`，则为必需。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' // [!code focus]
})
```

### verifierDomain

- **类型:** `TypedDataDomain`

账户域分隔符。如果未传递 `verifier`，则为必需。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signTypedData({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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
  verifierDomain: { // [!code focus]
    name: 'SoladyAccount', // [!code focus]
    version: '1', // [!code focus]
    chainId: 1, // [!code focus]
    verifyingContract: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' // [!code focus]
  }, // [!code focus]
})
```