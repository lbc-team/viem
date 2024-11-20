---
description: 签署交易，支持 EIP712 交易。
---

# signTransaction

签署交易，支持 EIP712 交易。

## 用法

:::code-group

```ts [example.ts]
import { account, walletClient } from './config'
 
const request = await walletClient.prepareTransactionRequest({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})

const signature = await walletClient.signTransaction(request) // [!code focus:2]
// 0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33

const hash = await walletClient.sendRawTransaction(signature)
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { zksync } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync'

export const walletClient = createWalletClient({
  chain: zksync,
  transport: custom(window.ethereum)
}).extend(eip712WalletActions())

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

### 账户提升

如果你不希望在每个 `prepareTransactionRequest` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts [example.ts]
import { walletClient } from './config' 
 
const request = await walletClient.prepareTransactionRequest({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})

const signature = await walletClient.signTransaction(request) // [!code focus:2]
// 0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33

const hash = await client.sendRawTransaction(signature)
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, custom } from 'viem'
import { eip712WalletActions } from 'viem/zksync'

// 从 EIP-712 提供者检索账户。 // [!code focus]
const [account] = await window.ethereum.request({ // [!code focus]
  method: 'eth_requestAccounts' // [!code focus]
}) // [!code focus]

export const walletClient = createWalletClient({
  account, // [!code focus]
  transport: custom(window.ethereum)
}).extend(eip712WalletActions())
```

```ts [config.ts (本地账户)]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { eip712WalletActions } from 'viem/zksync'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code focus]
  transport: custom(window.ethereum)
}).extend(eip712WalletActions())
```

:::

## 返回

[`Hex`](/docs/glossary/types#hex)

签署的序列化交易。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const signature = await walletClient.signTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### to

- **类型:** `0x${string}`

交易接收者或合约地址。

```ts
const signature = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
  value: 1000000000000000000n,
  nonce: 69
})
```

### accessList（可选）

- **类型:** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts
const signature = await walletClient.signTransaction({
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

### chain（可选）

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `walletClient.chain`

目标链。如果钱包的当前链与目标链不匹配，将抛出错误。

该链还用于推断其请求类型（例如，Celo 链具有可以传递给 `signTransaction` 的 `gatewayFee`）。

```ts
import { zksync } from 'viem/chains' // [!code focus]

const signature = await walletClient.signTransaction({
  chain: zksync, // [!code focus]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### data（可选）

- **类型:** `0x${string}`

带有编码参数的合约哈希方法调用。

```ts
const signature = await walletClient.signTransaction({
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### gasPrice（可选）

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts
const signature = await walletClient.signTransaction({
  account,
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1') 
})
```

### nonce（可选）

- **类型:** `number`

唯一编号，用于标识此交易。

```ts
const signature = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
  nonce: 69 // [!code focus]
})
```

### value（可选）

- **类型:** `bigint`

与此交易一起发送的 wei 值。

```ts
const signature = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
  nonce: 69
})
```

### gasPerPubdata（可选）

- **类型:** `bigint`

在以太坊上发布一个字节数据所需的 gas 量。

```ts
const hash = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  gasPerPubdata: 50000, // [!code focus]
  nonce: 69
})
```

### factoryDeps（可选）

- **类型:** `[0x${string}]`

包含已部署合约的字节码。

```ts
const hash = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  factoryDeps: ['0xcde...'], // [!code focus]
  nonce: 69
})
```

### paymaster（可选）

- **类型:** `Account | Address`

将支付费用的支付者账户地址。此字段需要 `paymasterInput`。

```ts
const hash = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
  nonce: 69
})
```

### paymasterInput（可选）

- **类型:** `0x${string}`

支付者的输入数据。此字段需要 `paymaster`。

```ts
const hash = await walletClient.signTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
  nonce: 69
})
```