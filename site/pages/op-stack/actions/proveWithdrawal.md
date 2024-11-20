---
outline: deep
description: 证明在 L2 上发生的提款。
---

# proveWithdrawal

证明在 L2 上发生的提款。用于提款流程。

内部执行对 [`proveWithdrawalTransaction` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L197) 的合约写入，位于 [Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol)。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL1, publicClientL2, walletClientL1 } from './config'

const receipt = await getTransactionReceipt(publicClientL2, {
  hash: '0xbbdd0957a82a057a76b5f093de251635ac4ddc6e2d0c4aa7fbf82d73e4e11039',
})

const [withdrawal] = getWithdrawals(receipt)
const output = await publicClientL1.getL2Output({
  l2BlockNumber: receipt.blockNumber,
  targetChain: publicClientL2.chain,
})

const args = await publicClientL2.buildProveWithdrawal({
  account,
  output,
  withdrawal,
})
 
const hash = await walletClientL1.proveWithdrawal(args) // [!code hl]
```

```ts [config.ts]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::


:::warning

在调用此函数之前，你必须在 L2 上 [构建参数](#building-parameters)。如果 gas 过低，交易执行将在 L2 上失败。

:::

### 构建参数

[`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal) 构建并准备证明提款交易的参数。

我们可以使用生成的 `args` 在 L1 上证明提款交易。

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
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

[查看更多关于 `buildProveWithdrawal` 操作的信息。](/op-stack/actions/buildProveWithdrawal)


### 账户提升

如果你不希望在每次 `proveWithdrawal` 中传递 `account`，你也可以在钱包客户端上提升账户（参见 `config.ts`）。

[了解更多。](/docs/clients/wallet#account)

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

const args = await publicClientL2.buildProveWithdrawal({
  output,
  withdrawal,
})
 
const hash = await walletClientL1.proveWithdrawal(args)
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
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
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code hl]
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

## 返回值

[`Hash`](/docs/glossary/types#hash)

证明提款的 [交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  l2OutputIndex: 4529n,
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### chain (可选)

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认值:** `client.chain`

L1 链。如果钱包的当前链与此链不匹配，将抛出错误。

```ts
import { mainnet } from 'viem/chains'

const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  chain: mainnet, // [!code focus]
  l2OutputIndex: 4529n,
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### gas (可选)

- **类型:** `bigint`

L1 上交易执行的 gas 限制。

`null` 跳过 gas 估算并将计算推迟到签名者。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  gas: 420_000n,  // [!code focus]
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### l2OutputIndex 

- **类型:** `bigint`

L2 输出的索引。通常来源于 [`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal)。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n, // [!code focus]
  gas: 420_000n, 
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每单位 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。 

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  maxFeePerGas: parseGwei('20'),  // [!code focus]
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每单位 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  maxFeePerGas: parseGwei('20'), 
  maxPriorityFeePerGas: parseGwei('2'),  // [!code focus]
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### nonce (可选)

- **类型:** `number`

唯一标识此交易的数字。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  nonce: 69, // [!code focus]
  targetChain: optimism,
})
```

### outputRootProof (可选)

- **类型:** `bigint`

L2 输出的证明。通常来源于 [`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal)。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  gas: 420_000n, 
  outputRootProof: { /* ... */ }, // [!code focus]
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### portalAddress (可选)

- **类型:** `Address`
- **默认值:** `targetChain.contracts.portal[chainId].address`

[Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 的地址。默认为 `targetChain` 上指定的 Optimism Portal 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  outputRootProof: { /* ... */ },
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
  targetChain: optimism,
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
})
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

执行交易的 L2 链。

```ts
import { mainnet } from 'viem/chains'

const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ },
  targetChain: optimism, // [!code focus]
})
```

### withdrawalProof

- **类型:** `bigint`

L2 提现的证明。通常来源于 [`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal)。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  gas: 420_000n, 
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ], // [!code focus]
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### withdrawal

- **类型:** `bigint`

提现。通常来源于 [`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal)。

```ts
const hash = await client.proveWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  gas: 420_000n, 
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ }, // [!code focus]
  targetChain: optimism,
})
```