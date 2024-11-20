---
outline: deep
description: 返回下一个 L2 争议游戏提交的时间。
---

# getTimeToNextGame

返回下一个 L2 争议游戏（在提供的区块号之后）提交的时间。用于 [Withdrawal](/op-stack/guides/withdrawals) 流程。

:::info
此操作仅与已升级到 [Fault Proofs](https://docs.optimism.io/stack/protocol/fault-proofs/overview) 并已部署 [DisputeGameFactoryProxy 合约](https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/extra/addresses/addresses.json) 的 OP Stack 链兼容。
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
} = await publicClientL1.getTimeToNextGame({ // [!code hl]
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

- 估计的 `interval` 争议游戏之间的时间间隔 - 等待交易被证明的最长时间。
- 估计的 `seconds` 直到下一个争议游戏提交的时间。
- 估计的 `timestamp` 下一个争议游戏的时间戳。

## 参数

### l2BlockNumber

- **类型:** `bigint`

最新的 L2 区块号。

```ts
const l2BlockNumber = publicClientL2.getBlockNumber() // [!code focus]
const { seconds } = await publicClientL1.getTimeToNextGame({ 
  l2BlockNumber, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const { seconds } = await publicClientL1.getTimeToNextGame({
  l2BlockNumber,
  targetChain: optimism, // [!code focus]
})
```

### disputeGameFactoryAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.disputeGameFactory[chainId].address`

[`DisputeGameFactory` 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/DisputeGameFactory.sol) 的地址。默认为 `targetChain` 上指定的 `DisputeGameFactory` 合约。

如果提供了 `disputeGameFactoryAddress`，则 `targetChain` 参数变为可选。

```ts
const { seconds } = await publicClientL1.getTimeToNextGame({
  l2BlockNumber,
  disputeGameFactoryAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```

### intervalBuffer (可选)

- **类型:** `number`
- **默认:** `1.1`

用于考虑非确定性时间间隔之间差异的缓冲。

```ts
const { seconds } = await publicClientL1.getTimeToNextGame({ 
  intervalBuffer: 1.2, // [!code focus]
  l2BlockNumber,
  targetChain: optimism, 
}) 
```

### portalAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.portal[chainId].address`

[`Portal` 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal2.sol) 的地址。默认为 `targetChain` 上指定的 `Portal` 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const { seconds } = await publicClientL1.getTimeToNextGame({
  l2BlockNumber,
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```