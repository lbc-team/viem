---
outline: deep
description: 完成在 L2 上发生的提款。
---

# finalizeWithdrawal

完成在 L2 上发生的提款。用于提款流程。

内部执行对 [`finalizeWithdrawalTransaction` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L272) 的合约写入，位于 [Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol)。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL2, walletClientL1 } from './config'

const receipt = await getTransactionReceipt(publicClientL2, {
  hash: '0xbbdd0957a82a057a76b5f093de251635ac4ddc6e2d0c4aa7fbf82d73e4e11039',
})

const [withdrawal] = getWithdrawals(receipt)
 
const hash = await walletClientL1.finalizeWithdrawal({ // [!code hl]
  account, // [!code hl]
  targetChain: publicClientL2.chain, // [!code hl]
  withdrawal, // [!code hl]
}) // [!code hl]
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

### 账户提升

如果你不希望在每次 `finalizeWithdrawal` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多.](/docs/clients/wallet#account)

:::code-group

```ts [example.ts]
import { account, publicClientL2, walletClientL1 } from './config'

const receipt = await getTransactionReceipt(publicClientL2, {
  hash: '0xbbdd0957a82a057a76b5f093de251635ac4ddc6e2d0c4aa7fbf82d73e4e11039',
})

const [withdrawal] = getWithdrawals(receipt)
 
const hash = await walletClientL1.finalizeWithdrawal({ 
  account, // [!code --]
  targetChain: publicClientL2.chain, 
  withdrawal, 
}) 
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 // [!code ++]
const [account] = await window.ethereum.request({ // [!code ++]
  method: 'eth_requestAccounts' // [!code ++]
}) // [!code ++]

export const walletClientL1 = createWalletClient({
  account, // [!code ++]
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
  account: privateKeyToAccount('0x...'), // [!code ++]
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

## 返回

[`Hash`](/docs/glossary/types#hash)

完成提款的 [交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### chain (可选)

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `client.chain`

L1 链。如果钱包的当前链与此链不匹配，将抛出错误。

```ts
import { mainnet } from 'viem/chains'

const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  chain: mainnet, // [!code focus]
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### gas (可选)

- **类型:** `bigint`

L1 上交易执行的 gas 限制。

`null` 跳过 gas 估算并将计算推迟到签名者。

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  gas: 420_000n,  // [!code focus]
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'),  // [!code focus]
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'), 
  maxPriorityFeePerGas: parseGwei('2'),  // [!code focus]
  withdrawal: { /* ... */ },
  targetChain: optimism,
})
```

### nonce (可选)

- **类型:** `number`

唯一标识此交易的数字。

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  withdrawal: { /* ... */ },
  nonce: 69, // [!code focus]
  targetChain: optimism,
})
```

### portalAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.portal[chainId].address`

[Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 的地址。默认为在 `targetChain` 上指定的 Optimism Portal 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
  targetChain: optimism,
  withdrawal: { /* ... */ },
})
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

执行交易的 L2 链。

```ts
import { mainnet } from 'viem/chains'

const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  withdrawal: { /* ... */ },
  targetChain: optimism, // [!code focus]
})
```

### withdrawal

- **类型:** `bigint`

提款。

```ts
const hash = await client.finalizeWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  gas: 420_000n, 
  withdrawal: { /* ... */ }, // [!code focus]
  targetChain: optimism,
})
```