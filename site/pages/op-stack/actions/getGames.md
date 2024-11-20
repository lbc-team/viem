---
outline: deep
description: 检索 L2 的争议游戏。
---

# getGames

检索 L2 的争议游戏。用于 [Withdrawal](/op-stack/guides/withdrawals) 流程。

:::info
此操作仅与已升级到 [Fault Proofs](https://docs.optimism.io/stack/protocol/fault-proofs/overview) 并已部署 [DisputeGameFactoryProxy contract](https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/extra/addresses/addresses.json) 的 OP Stack 链兼容。
:::

## 用法

:::code-group

```ts [example.ts]
import { optimism } from 'viem/chains'
import { account, publicClientL1 } from './config'

const games = await publicClientL1.getGames({ // [!code hl]
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

## 返回

`GetGamesReturnType`

争议游戏。

## 参数

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const games = await publicClientL1.getGames({
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
const games = await publicClientL1.getGames({
  l2BlockNumber,
  disputeGameFactoryAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```

### l2BlockNumber (可选)

- **类型:** `bigint`

L2 区块号。

```ts
const games = await publicClientL1.getGames({ 
  l2BlockNumber: 69420n, // [!code focus]
  targetChain: optimism, 
}) 
```

### limit (可选)

- **类型:** `number`
- **默认:** `100`

提取的游戏限制。

```ts
const games = await publicClientL1.getGames({ 
  limit: 10, // [!code focus]
  targetChain: optimism, 
}) 
```

### portalAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.portal[chainId].address`

[`Portal` contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal2.sol) 的地址。默认为 `targetChain` 上指定的 `Portal` 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const games = await publicClientL1.getGames({
  l2BlockNumber,
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```