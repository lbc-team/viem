---
outline: deep
description: 等待下一个争议游戏被提交。
---

# waitForNextGame

等待下一个争议游戏（在提供的区块号之后）被提交。用于 [waitToProve](/op-stack/actions/waitToProve) 动作中。

内部调用 [`getTimeToNextGame`](/op-stack/actions/getTimeToNextGame) 并等待返回的 `seconds`。

:::info
此动作仅与已升级到 [Fault Proofs](https://docs.optimism.io/stack/protocol/fault-proofs/overview) 并已部署 [DisputeGameFactoryProxy contract](https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/extra/addresses/addresses.json) 的 OP Stack 链兼容。
:::

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL1, publicClientL2 } from './config'

const l2BlockNumber = await publicClientL2.getBlockNumber()
const game = await publicClientL1.waitForNextGame({ // [!code hl]
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
  transport: http()
})
```

:::

## 返回

`waitForNextGameReturnType`

争议游戏。

## 参数

### l2BlockNumber

- **类型:** `bigint`

L2 区块号。

```ts
const game = await publicClientL1.waitForNextGame({ 
  l2BlockNumber: 69420n, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const game = await publicClientL1.waitForNextGame({
  l2BlockNumber,
  targetChain: optimism, // [!code focus]
})
```

### disputeGameFactoryAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.disputeGameFactory[chainId].address`

[`DisputeGameFactory` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/DisputeGameFactory.sol) 的地址。默认为 `targetChain` 上指定的 `DisputeGameFactory` 合约。

如果提供了 `disputeGameFactoryAddress`，则 `targetChain` 参数变为可选。

```ts
const game = await publicClientL1.waitForNextGame({
  l2BlockNumber,
  disputeGameFactoryAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```

### intervalBuffer (可选)

- **类型:** `number`
- **默认:** `1.1`

用于考虑非确定性时间间隔之间差异的缓冲区。

```ts
const game = await publicClientL1.waitForNextGame({
  intervalBuffer: 1.2, // [!code focus]
  l2BlockNumber,
  targetChain: optimism, 
}) 
```

### portalAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.portal[chainId].address`

[`Portal` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal2.sol) 的地址。默认为 `targetChain` 上指定的 `Portal` 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const game = await publicClientL1.waitForNextGame({
  l2BlockNumber,
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```