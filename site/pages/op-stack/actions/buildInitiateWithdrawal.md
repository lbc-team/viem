---
outline: deep
description: 构建并准备参数以在 L2 上发起提款。
---

# buildInitiateWithdrawal

构建并准备参数以在 L2 上发起 [提款](https://community.optimism.io/docs/protocol/withdrawal-flow/#withdrawal-initiating-transaction)。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL1, walletClientL2 } from './config'

const args = await publicClientL1.buildInitiateWithdrawal({ // [!code hl]
  account, // [!code hl]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code hl]
  value: parseEther('1'), // [!code hl]
}) // [!code hl]
 
const hash = await walletClientL2.initiateWithdrawal(args)
```

```ts [config.ts]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL2 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::


### 账户提升

如果你不希望在每个 `buildInitiateWithdrawal` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts [example.ts]
import { publicClientL1, walletClientL2 } from './config'

const args = await publicClientL1.buildInitiateWithdrawal({
  mint: parseEther('1')
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
 
const hash = await walletClientL2.initiateWithdrawal(args)
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 // [!code hl]
const [account] = await window.ethereum.request({ // [!code hl]
  method: 'eth_requestAccounts' // [!code hl]
}) // [!code hl]

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL2 = createWalletClient({
  chain: optimism,
  account, // [!code hl]
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL2 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL2 = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code hl]
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

:::

## 返回

`InitiateWithdrawalParameters`

发起 [提款](/op-stack/actions/initiateWithdrawal) 所需的参数。

## 参数

### account（可选）

- **类型：** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const args = await client.buildInitiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### data（可选）

- **类型：** `Hex`

编码的合约方法和参数。

```ts
const args = await client.buildInitiateWithdrawal({
  data: '0x...', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### gas（可选）

- **类型：** `bigint`

L1 上交易执行的 gas 限制。

```ts
const args = await client.buildInitiateWithdrawal({
  gas: 21_000n, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### to（可选）

- **类型：** `Address`

L1 收件人。

```ts
const args = await client.buildInitiateWithdrawal({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',  // [!code focus]
  value: parseEther('1')
})
```

### value（可选）

- **类型：** `bigint`

从 L2 提取到 L1 的 wei 值。将从调用者的 L2 余额中扣除。

```ts
const args = await client.buildInitiateWithdrawal({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
  value: parseEther('1') // [!code focus]
})
```