---
outline: deep
description: 构建证明在 L2 上发起了提款的交易。
---

# buildProveWithdrawal

构建证明在 L2 上发起了提款的交易。用于提款流程。

## 使用方法

:::code-group

```ts [example.ts]
import { account, publicClientL2, walletClientL1 } from './config'

const receipt = await getTransactionReceipt(publicClientL2, {
  hash: '0xbbdd0957a82a057a76b5f093de251635ac4ddc6e2d0c4aa7fbf82d73e4e11039',
})

const [withdrawal] = getWithdrawals(receipt)
const output = await walletClientL1.getL2Output({
  l2BlockNumber: receipt.blockNumber,
  targetChain: publicClientL2.chain,
})

const args = await publicClientL2.buildProveWithdrawal({ // [!code hl]
  account, // [!code hl]
  output, // [!code hl]
  withdrawal, // [!code hl]
}) // [!code hl]
 
const hash = await walletClientL1.proveWithdrawal(args)
```

```ts [config.ts]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::


### 账户提升

如果你不希望在每个 `buildProveWithdrawal` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts [example.ts]
import { publicClientL2, walletClientL1 } from './config'

const args = await publicClientL2.buildProveWithdrawal({
  output,
  withdrawal,
})
 
const hash = await walletClientL1.proveWithdrawal(args)
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 // [!code hl]
const [account] = await window.ethereum.request({ // [!code hl]
  method: 'eth_requestAccounts' // [!code hl]
}) // [!code hl]

export const walletClientL1 = createWalletClient({
  account, // [!code hl]
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code hl]
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())
```

:::

## 返回

`BuildProveWithdrawalReturnType`

执行 [证明提款交易](/op-stack/actions/proveWithdrawal) 所需的参数。

## 参数

### account（可选）

- **类型：** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const args = await client.buildProveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  output,
  withdrawal,
})
```

### output

- **类型：** `GetL2OutputReturnType`

L2 输出。通常由 [`getL2Output` 操作](/op-stack/actions/getL2Output) 提供。

```ts
const args = await client.buildProveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  output: { /* ... */ }, // [!code focus]
  withdrawal, 
})
```

### withdrawal

- **类型：** `Withdrawal`

提款消息。通常由 [`getWithdrawals` 操作](/op-stack/utilities/getWithdrawals) 提供。

```ts
const args = await client.buildProveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  output,
  withdrawal: { /* ... */ }, // [!code focus]
})
```