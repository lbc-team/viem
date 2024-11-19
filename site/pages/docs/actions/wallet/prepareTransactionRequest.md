---
description: 准备一个交易请求以进行签名。
---

# prepareTransactionRequest

通过填充 nonce、gas 限制、费用值和交易类型来准备一个交易请求以进行签名。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient } from './config'
 
const request = await walletClient.prepareTransactionRequest({ // [!code focus:16]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
// @log: {
// @log:   account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
// @log:   to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
// @log:   maxFeePerGas: 150000000000n,
// @log:   maxPriorityFeePerGas: 1000000000n,
// @log:   nonce: 69,
// @log:   type: 'eip1559',
// @log:   value: 1000000000000000000n
// @log: }


const serializedTransaction = await walletClient.signTransaction(request)
const hash = await walletClient.sendRawTransaction({ serializedTransaction })
```

```ts twoslash [config.ts] filename="config.ts"
import 'viem/window'
// ---cut---
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})

// @log: ↓ JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'

// @log: ↓ 本地账户
// export const account = privateKeyToAccount(...)
```

:::

### 账户提升

如果你不希望在每个 `prepareTransactionRequest` 中传递 `account`，你还可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './config'
 
const request = await walletClient.prepareTransactionRequest({ // [!code focus:16]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
// @log: {
// @log:   account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
// @log:   to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
// @log:   maxFeePerGas: 150000000000n,
// @log:   maxPriorityFeePerGas: 1000000000n,
// @log:   nonce: 69,
// @log:   type: 'eip1559',
// @log:   value: 1000000000000000000n
// @log: }


const serializedTransaction = await walletClient.signTransaction(request)
const hash = await walletClient.sendRawTransaction({ serializedTransaction })
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

[`TransactionRequest`](/docs/glossary/types#transactionrequest)

交易请求。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### to

- **类型:** `0x${string}`

交易接收者或合约地址。

```ts twoslash
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
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
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
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

const request = await walletClient.prepareTransactionRequest({
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

用于 [Blob 交易](/docs/guides/blob-transactions) 的 blobs。

```ts
import * as kzg from 'c-kzg'
import { toBlobs, stringToHex } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) 

const request = await walletClient.prepareTransactionRequest({
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

该链还用于推断其请求类型（例如，Celo 链具有可以传递给 `prepareTransactionRequest` 的 `gatewayFee`）。

```ts twoslash
// [!include config.ts]
// ---cut---
import { optimism } from 'viem/chains' // [!code focus]

const request = await walletClient.prepareTransactionRequest({
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
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### gasPrice（可选）

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [遗留交易](/docs/glossary/terms#legacy-transaction)。

```ts twoslash
// [!include config.ts]
// ---cut---
import { parseEther, parseGwei } from 'viem'

const request = await walletClient.prepareTransactionRequest({
  account,
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1') 
})
```

### kzg (可选)

- **类型:** `KZG`

KZG 实现用于 [Blob Transactions](/docs/guides/blob-transactions)。

有关更多信息，请参见 [`setupKzg`](/docs/utilities/setupKzg)。

```ts
import * as kzg from 'c-kzg'
import { toBlobs, stringToHex } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) // [!code focus]

const request = await walletClient.prepareTransactionRequest({
  account,
  blobs: toBlobs({ data: stringToHex('blobby blob!') }), // [!code focus]
  kzg, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 Transactions](/docs/glossary/terms#eip-1559-transaction)

```ts twoslash
// [!include config.ts]
// ---cut---
import { parseEther, parseGwei } from 'viem'

const request = await walletClient.prepareTransactionRequest({
  account,
  maxFeePerGas: parseGwei('20'),  // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 Transactions](/docs/glossary/terms#eip-1559-transaction)

```ts twoslash
// [!include config.ts]
// ---cut---
import { parseEther, parseGwei } from 'viem'

const request = await walletClient.prepareTransactionRequest({
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
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
  nonce: 69 // [!code focus]
})
```

### nonceManager (可选)

- **类型:** `NonceManager | undefined`

Nonce 管理器，用于消耗和递增交易请求的账户 nonce。

```ts twoslash
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
  nonceManager: account.nonceManager // [!code focus]
})
```

### parameters (可选)

- **类型:** `("fees" | "gas" | "nonce" | "type")[]`
- **默认值:** `["fees", "gas", "nonce", "type"]`

要准备的参数。

例如，如果提供 `["gas", "nonce"]`，则仅准备 `gas` 和 `nonce` 参数。

```ts twoslash
// [!include config.ts]
// ---cut---
const request = await walletClient.prepareTransactionRequest({
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
// [!include config.ts]
// ---cut---
import { parseEther } from 'viem'

const request = await walletClient.prepareTransactionRequest({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
  nonce: 69
})
```