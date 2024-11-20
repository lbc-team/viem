---
outline: deep
description: 返回提款的当前状态。
---

# getWithdrawalStatus

返回提款的当前状态。用于[提款](/op-stack/guides/withdrawals)流程。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL1, publicClientL2 } from './config'

const receipt = await publicClientL2.getTransactionReceipt({
  hash: '0x7b5cedccfaf9abe6ce3d07982f57bcb9176313b019ff0fc602a0b70342fe3147'
})

const status = await publicClientL1.getWithdrawalStatus({ // [!code hl]
  receipt, // [!code hl]
  targetChain: publicClientL2.chain, // [!code hl]
}) // [!code hl]
// "ready-to-prove" // [!code hl]
```

```ts [config.ts]
import { createPublicClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())
export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
})
```

:::

## 返回值

`"waiting-to-prove" | "ready-to-prove" | "waiting-to-finalize" | "ready-to-finalize" | "finalized"`

## 参数

### receipt

- **类型:** `TransactionReceipt`

交易收据。

```ts
const status = await publicClientL1.getWithdrawalStatus({ 
  receipt, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const status = await publicClientL1.getWithdrawalStatus({
  receipt,
  targetChain: optimism, // [!code focus]
})
```

### l2OutputOracleAddress (可选)

- **类型:** `Address`
- **默认值:** `targetChain.contracts.l2OutputOracle[chainId].address`

[L2 输出预言机合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L2OutputOracle.sol)的地址。默认为在 `targetChain` 上指定的 L2 输出预言机合约。

如果提供了 `l2OutputOracleAddress`，则 `targetChain` 参数变为可选。

```ts
const status = await publicClientL1.getWithdrawalStatus({
  receipt,
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
})
```

### portalAddress (可选)

- **类型:** `Address`
- **默认值:** `targetChain.contracts.portal[chainId].address`

[Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol)的地址。默认为在 `targetChain` 上指定的 L2 输出预言机合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const status = await publicClientL1.getWithdrawalStatus({
  receipt,
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```