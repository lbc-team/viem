---
outline: deep
description: 检索在提供的 L2 区块号之后发生的有效争议游戏。
---

# getGame

检索在提供的 L2 区块号之后发生的有效争议游戏。用于 [Withdrawal](/op-stack/guides/withdrawals) 流程。

:::info
此操作仅与已升级到 [Fault Proofs](https://docs.optimism.io/stack/protocol/fault-proofs/overview) 并已部署 [DisputeGameFactoryProxy contract](https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/extra/addresses/addresses.json) 的 OP Stack 链兼容。
:::

## 使用方法

:::code-group

```ts [example.ts]
import { optimism } from 'viem/chains'
import { account, publicClientL1 } from './config'

const game = await publicClientL1.getGame({ // [!code hl]
  l2BlockNumber: 69420n, // [!code hl]
  targetChain: optimism, // [!code hl]
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
```

:::

## 返回值

`GetGameReturnType`

一个有效的争议游戏。

## 参数

### l2BlockNumber

- **类型:** `bigint`

L2 区块号。

```ts
const game = await publicClientL1.getGame({ 
  l2BlockNumber: 69420n, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const game = await publicClientL1.getGame({
  l2BlockNumber,
  targetChain: optimism, // [!code focus]
})
```

### disputeGameFactoryAddress (可选)

- **类型:** `Address`
- **默认值:** `targetChain.contracts.disputeGameFactory[chainId].address`

[`DisputeGameFactory` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/dispute/DisputeGameFactory.sol) 的地址。默认为在 `targetChain` 上指定的 `DisputeGameFactory` 合约。

如果提供了 `disputeGameFactoryAddress`，则 `targetChain` 参数变为可选。

```ts
const game = await publicClientL1.getGame({
  l2BlockNumber,
  disputeGameFactoryAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```