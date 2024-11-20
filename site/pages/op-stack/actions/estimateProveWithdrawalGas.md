---
outline: deep
description: 估算在 L2 上发生的提款所需的 gas。
---

# estimateProveWithdrawalGas

估算在 L2 上发生的提款所需的 gas。

## 使用方法

:::code-group

```ts [example.ts]
import { optimism } from 'viem/chains'
import { account, publicClientL1 } from './config'

const gas = await publicClientL1.estimateProveWithdrawalGas({ // [!code hl]
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code hl]
  l2OutputIndex: 4529n, // [!code hl]
  outputRootProof: { ... }, // [!code hl]
  targetChain: optimism, // [!code hl]
  withdrawalProof: [ ... ], // [!code hl]
  withdrawal: { ... }, // [!code hl]
}) // [!code hl]
```

```ts [config.ts]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { publicActionsL1 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

## 返回值

`bigint`

估算的 gas。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const hash = await client.estimateProveWithdrawalGas({
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

const hash = await client.estimateProveWithdrawalGas({
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

```ts
const hash = await client.estimateProveWithdrawalGas({
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
const hash = await client.estimateProveWithdrawalGas({
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

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。 

```ts
const hash = await client.estimateProveWithdrawalGas({
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

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const hash = await client.estimateProveWithdrawalGas({
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
const hash = await client.estimateProveWithdrawalGas({
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
const hash = await client.estimateProveWithdrawalGas({
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

[Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 的地址。默认为在 `targetChain` 上指定的 Optimism Portal 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const hash = await client.estimateProveWithdrawalGas({
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

const hash = await client.estimateProveWithdrawalGas({
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

L2 提款的证明。通常来源于 [`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal)。

```ts
const hash = await client.estimateProveWithdrawalGas({
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

提款。通常来源于 [`buildProveWithdrawal` 操作](/op-stack/actions/buildProveWithdrawal)。

```ts
const hash = await client.estimateProveWithdrawalGas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  l2OutputIndex: 4529n,
  gas: 420_000n, 
  outputRootProof: { /* ... */ },
  withdrawalProof: [ /* ... */ ],
  withdrawal: { /* ... */ }, // [!code focus]
  targetChain: optimism,
})
```