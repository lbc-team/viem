---
description: 使用账户的私钥签名消息。
---

# signMessage

计算以太坊特定的签名，格式为 [EIP-191](https://eips.ethereum.org/EIPS/eip-191)：`keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`。

使用计算出的签名，你可以：
- 使用 [`verifyMessage`](/docs/utilities/verifyMessage) 验证签名，
- 使用 [`recoverMessageAddress`](/docs/utilities/recoverMessageAddress) 从签名中恢复签名地址。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient } from './config'
 
const signature_1 = await walletClient.signMessage({ // [!code focus:99]
  account,
  message: 'hello world',
})
// @log: 输出: "0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b"

const signature_2 = await walletClient.signMessage({
  account,
  // 消息的十六进制数据表示。
  message: { raw: '0x68656c6c6f20776f726c64' },
})
// @log: 输出: "0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b"
```

```ts twoslash [config.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]

export const [account] = await walletClient.getAddresses()
// @log: ↑ JSON-RPC 账户

// export const account = privateKeyToAccount(...)
// @log: ↑ 本地账户
```

:::

### 账户提升

如果你不想在每个 `signMessage` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#withaccount)。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './config'
 
const signature = await walletClient.signMessage({ // [!code focus:99]
  message: 'hello world',
})
// @log: "0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b"
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, custom } from 'viem'

// 从 EIP-1193 提供者检索账户。
const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
})

export const walletClient = createWalletClient({
  account,
  transport: custom(window.ethereum!)
})
```

```ts twoslash [config.ts (本地账户)] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'),
  transport: http()
})
```

:::

## 返回

[`Hex`](/docs/glossary/types#hex)

签名的消息。

## 参数

### account

- **类型:** `Account | Address`

用于签名的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus:1]
  message: 'hello world',
})
```

### message

- **类型:** `string | { raw: Hex | ByteArray }`

要签名的消息。

默认情况下，viem 签名消息的 UTF-8 表示。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: 'hello world', // [!code focus:1]
})
```

要签名消息的数据表示，你可以使用 `raw` 属性。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const signature = await walletClient.signMessage({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
})
```

## JSON-RPC 方法

- JSON-RPC 账户：
  - [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign)
- 本地账户
  - 本地签名。无需 JSON-RPC 请求。