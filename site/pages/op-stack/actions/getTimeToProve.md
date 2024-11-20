---
outline: deep
description: 获取 L2 提现交易准备好被证明的时间。
---

# getTimeToProve

获取 L2 提现交易准备好被证明的时间。用于 [Withdrawal](/op-stack/guides/withdrawals) 流程。

内部调用 [`getTimeToNextL2Output`](/op-stack/actions/getTimeToNextL2Output)。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL1, publicClientL2 } from './config'

const receipt = await publicClientL2.getTransactionReceipt({
  hash: '0x7b5cedccfaf9abe6ce3d07982f57bcb9176313b019ff0fc602a0b70342fe3147'
})

const { // [!code hl]
  interval, // [!code hl]
  seconds, // [!code hl]
  timestamp // [!code hl]
} = await publicClientL1.getTimeToProve({ // [!code hl]
  receipt, // [!code hl]
  targetChain: publicClientL2.chain, // [!code hl]
}) // [!code hl]
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

`{ interval: number, seconds: number, timestamp: number }`

- `interval` 是 L2 输出之间的时间间隔 - 等待交易被证明的最长时间。
- 预计 `seconds` 直到交易可以被证明。
- 预计 `timestamp` 交易可以被证明的时间戳。

## 参数

### receipt

- **类型:** `TransactionReceipt`

交易收据。

```ts
const time = await publicClientL1.getTimeToProve({ 
  receipt, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const time = await publicClientL1.getTimeToProve({
  l2BlockNumber,
  targetChain: optimism, // [!code focus]
})
```

### intervalBuffer (可选)

- **类型:** `number`
- **默认值:** `1.1`

用于考虑非确定性时间间隔之间差异的缓冲。

```ts
const time = await publicClientL1.getTimeToProve({ 
  intervalBuffer: 1.2, // [!code focus]
  l2BlockNumber,
  targetChain: optimism, 
}) 
```

### l2OutputOracleAddress (可选)

- **类型:** `Address`
- **默认值:** `targetChain.contracts.l2OutputOracle[chainId].address`

[L2 输出预言机合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L2OutputOracle.sol) 的地址。默认为在 `targetChain` 上指定的 L2 输出预言机合约。

如果提供了 `l2OutputOracleAddress`，则 `targetChain` 参数变为可选。

```ts
const time = await publicClientL1.getTimeToProve({
  l2BlockNumber,
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```