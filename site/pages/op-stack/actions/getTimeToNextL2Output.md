---
outline: deep
description: 构建并准备参数以在 L2 上发起提款。
---

# getTimeToNextL2Output

返回在提供的区块号之后，下一次 L2 输出提交的时间。用于 [Withdrawal](/op-stack/guides/withdrawals) 流程。

:::warning
**此操作将在未来被弃用。**

对于已升级到 [Fault Proofs](https://docs.optimism.io/stack/protocol/fault-proofs/overview) 并已部署 [DisputeGameFactoryProxy contract](https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/extra/addresses/addresses.json) 的 OP Stack 链，请使用 [`getTimeToNextGame`](/op-stack/actions/getTimeToNextGame)。
:::

## 用法

:::code-group

```ts [example.ts]
import { optimism } from 'viem/chains'
import { account, publicClientL1, publicClientL2 } from './config'

const l2BlockNumber = publicClientL2.getBlockNumber()

const { // [!code hl]
  interval, // [!code hl]
  seconds, // [!code hl]
  timestamp // [!code hl]
} = await publicClientL1.getTimeToNextL2Output({ // [!code hl]
  l2BlockNumber, // [!code hl]
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
  transport: custom(window.ethereum)
})
```

:::

## 返回

`{ interval: number, seconds: number, timestamp: number }`

- `interval` 是 L2 输出之间的时间间隔 - 等待交易被证明的最长时间。
- 估计 `seconds` 直到下一次 L2 输出提交。
- 估计的 `timestamp` 为下一次 L2 输出的时间戳。

## 参数

### l2BlockNumber

- **类型:** `bigint`

最新的 L2 区块号。

```ts
const l2BlockNumber = publicClientL2.getBlockNumber() // [!code focus]
const { seconds } = await publicClientL1.getTimeToNextL2Output({ 
  l2BlockNumber, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const { seconds } = await publicClientL1.getTimeToNextL2Output({
  l2BlockNumber,
  targetChain: optimism, // [!code focus]
})
```

### intervalBuffer (可选)

- **类型:** `number`
- **默认值:** `1.1`

用于考虑非确定性时间间隔之间差异的缓冲。

```ts
const { seconds } = await publicClientL1.getTimeToNextL2Output({ 
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
const { seconds } = await publicClientL1.getTimeToNextL2Output({
  l2BlockNumber,
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```