---
description: 创建、签名并将新交易发送到网络。
---

# sendTransaction

创建、签名并将新交易发送到网络。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient } from './config'
 
const hash = await walletClient.sendTransaction({ // [!code focus:99]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
// '0x...'
```

```ts twoslash [config.ts] filename="config.ts"
// [!include ~/snippets/walletClient.ts]

export const [account] = await walletClient.getAddresses()
// @log: ↑ JSON-RPC 账户

// export const account = privateKeyToAccount(...)
// @log: ↑ 本地账户
```

:::

### 账户提升

如果你不希望在每个 `sendTransaction` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './config'
 
const hash = await walletClient.sendTransaction({ // [!code focus:99]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
// '0x...'
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

[`Hash`](/docs/glossary/types#hash)

[交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### account

- **类型:** `Account | Address | null`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。如果设置为 `null`，则假定传输将处理填充交易的发送者。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### to

- **类型:** `0x${string}`

交易接收者或合约地址。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
  value: 1000000000000000000n,
  nonce: 69
})
```

### accessList（可选）

- **类型:** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  accessList: [ // [!code focus:6]
    {
      address: '0x1',
      storageKeys: ['0x1'],
    },
  ],
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### authorizationList（可选）

- **类型:** `AuthorizationList`

签名的 EIP-7702 授权列表。

```ts twoslash
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { eip7702Actions } from 'viem/experimental'

const account = privateKeyToAccount('0x...')

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
// ---cut---
const authorization = await walletClient.signAuthorization({ 
  account,
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', 
}) 

const hash = await walletClient.sendTransaction({
  account,
  authorizationList: [authorization], // [!code focus]
  data: '0xdeadbeef',
  to: account.address,
})
```

:::note
**参考**
- [EIP-7702 概述](/experimental/eip7702)
- [`signAuthorization` 文档](/experimental/eip7702/signAuthorization)
:::

### blobs（可选）

- **类型:** `Hex[]`

用于 [Blob 交易](/docs/guides/blob-transactions) 的 Blob。

```ts
import * as kzg from 'c-kzg'
import { toBlobs, stringToHex } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) 

const hash = await walletClient.sendTransaction({
  account,
  blobs: toBlobs({ data: stringToHex('blobby blob!') }), // [!code focus]
  kzg,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
})
```

### chain（可选）

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `walletClient.chain`

目标链。如果钱包的当前链与目标链不匹配，将抛出错误。

链也用于推断其请求类型（例如，Celo 链具有可以传递给 `sendTransaction` 的 `gatewayFee`）。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
import { optimism } from 'viem/chains' // [!code focus]

const hash = await walletClient.sendTransaction({
  chain: optimism, // [!code focus]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### data（可选）

- **类型:** `0x${string}`

带有编码参数的合约哈希方法调用。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### gasPrice（可选）

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account,
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1') 
})
```

### kzg（可选）

- **类型:** `KZG`

用于 [Blob 交易](/docs/guides/blob-transactions) 的 KZG 实现。

有关更多信息，请参见 [`setupKzg`](/docs/utilities/setupKzg)。

```ts
import * as kzg from 'c-kzg'
import { toBlobs, stringToHex } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) // [!code focus]

const hash = await walletClient.sendTransaction({
  account,
  blobs: toBlobs({ data: stringToHex('blobby blob!') }), // [!code focus]
  kzg, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
})
```

### maxFeePerGas（可选）

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account,
  maxFeePerGas: parseGwei('20'),  // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每单位 gas 的最大优先费（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### nonce (可选)

- **类型:** `number`

唯一编号，用于标识此交易。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
  nonce: 69 // [!code focus]
})
```

### value (可选)

- **类型:** `bigint`

与此交易一起发送的 wei 值。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
// @noErrors
const hash = await walletClient.sendTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
  nonce: 69
})
```

## 提示

- 对于 dapps：使用此操作时，假定用户已连接到他们的钱包（例如，已授权 dapp 通过 [`requestAddresses`](/docs/actions/wallet/requestAddresses) 访问他们的账户）。你还可以通过 [`getAddresses`](/docs/actions/wallet/getAddresses) 检查用户是否已授予对其账户的访问权限

## 实时示例

查看下面的实时 [发送交易示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions) 中 `sendTransaction` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

- JSON-RPC 账户：
  - [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
- 本地账户：
  - [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)