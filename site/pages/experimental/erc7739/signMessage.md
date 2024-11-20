---
description: 通过 Solady 的 ERC-1271 格式签署个人签名消息。
---

# signMessage

通过 [ERC-7739 `PersonalSign` 格式](https://eips.ethereum.org/EIPS/eip-7739) 签署 [EIP-191](https://eips.ethereum.org/EIPS/eip-191) 个人签名消息。

此操作适用于为实现（或符合）[ERC-7739](https://eips.ethereum.org/EIPS/eip-7739) 的合约（例如 ERC-4337 智能账户）签署消息（例如 Solady 的 [ERC1271.sol](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC1271.sol)）。

使用计算出的签名，你可以使用 [`verifyMessage`](/docs/actions/public/verifyMessage) 来验证签名。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient } from './config'
 
const signature_1 = await walletClient.signMessage({ // [!code focus:99]
  // 用于签名的账户。
  account,
  message: 'hello world',
  // 验证合约地址（例如 ERC-4337 智能账户）。
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})

const signature_2 = await walletClient.signMessage({
  // 用于签名的账户。
  account,
  // 消息的十六进制数据表示。
  message: { raw: '0x68656c6c6f20776f726c64' },
  // 验证合约地址（例如 ERC-4337 智能账户）
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { erc7739Actions } from 'viem/experimental'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
}).extend(erc7739Actions())

export const [account] = await walletClient.getAddresses()
// @log: ↑ JSON-RPC 账户

// export const account = privateKeyToAccount(...)
// @log: ↑ 本地账户
```

:::

## 账户和/或验证器提升

如果你不希望在每个 `signMessage` 中传递 `account` 和/或 `verifier`，你还可以在钱包客户端上提升账户和/或验证器（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#withaccount)。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './config'
 
const signature = await walletClient.signMessage({ // [!code focus:99]
  message: 'hello world',
})
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, custom } from 'viem'
import { erc7739Actions } from 'viem/experimental'

// 从 EIP-1193 提供者检索账户。
const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
})

export const walletClient = createWalletClient({
  account,
  transport: custom(window.ethereum!)
}).extend(erc7739Actions({ 
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' 
}))
```

```ts twoslash [config.ts (本地账户)] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { erc7739Actions } from 'viem/experimental'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'),
  transport: http()
}).extend(erc7739Actions({ 
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' 
}))
```

:::

## 返回

[`Hex`](/docs/glossary/types#hex)

签名的消息。

## 参数

### account

- **类型:** `Account | Address`

用于签署消息的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
  message: 'hello world',
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2'
})
```

### message

- **类型:** `string | { raw: Hex | ByteArray }`

要签署的消息。

默认情况下，viem 签署消息的 UTF-8 表示。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world', // [!code focus:1]
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2',
})
```

要签署消息的数据表示，你可以使用 `raw` 属性。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2',
})
```

### verifier

- **类型:** `Address`

验证合约的地址（例如 ERC-4337 智能账户）。如果未传递 `verifierDomain`，则为必需。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world',
  verifier: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2', // [!code focus:1]
})
```

### verifierDomain

- **类型:** `TypedDataDomain`

账户域分隔符。如果未传递 `verifier`，则为必需。

```ts twoslash
import { walletClient } from './config'

const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world',
  verifierDomain: { // [!code focus]
    name: 'SoladyAccount', // [!code focus]
    version: '1', // [!code focus]
    chainId: 1, // [!code focus]
    verifyingContract: '0xCB9fA1eA9b8A3bf422a8639f23Df77ea66020eC2' // [!code focus]
  }, // [!code focus]
})
```