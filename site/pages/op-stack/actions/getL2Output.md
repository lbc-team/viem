---
outline: deep
description: 检索在提供的区块号之后发生的第一个 L2 输出提案。
---

# getL2Output

检索在提供的区块号之后发生的第一个 L2 输出提案。用于 [Withdrawal](/op-stack/guides/withdrawals) 流程。

:::warning
**此操作将在未来被弃用。**

对于已升级到 [Fault Proofs](https://docs.optimism.io/stack/protocol/fault-proofs/overview) 并已部署 [DisputeGameFactoryProxy 合约](https://github.com/ethereum-optimism/superchain-registry/blob/main/superchain/extra/addresses/addresses.json) 的 OP Stack 链，请使用 [`getGame`](/op-stack/actions/getGame)。
:::

## 用法

:::code-group

```ts [example.ts]
import { optimism } from 'viem/chains'
import { account, publicClientL1 } from './config'

const output = await publicClientL1.getL2Output({ // [!code hl]
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

## 返回

`GetL2OutputReturnType`

L2 输出提案。

## 参数

### l2BlockNumber

- **类型:** `bigint`

L2 区块号。

```ts
const output = await publicClientL1.getL2Output({ 
  l2BlockNumber: 69420n, // [!code focus]
  targetChain: optimism, 
}) 
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const output = await publicClientL1.getL2Output({
  l2BlockNumber,
  targetChain: optimism, // [!code focus]
})
```

### l2OutputOracleAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.l2OutputOracle[chainId].address`

[L2 输出预言机合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L2OutputOracle.sol) 的地址。默认为在 `targetChain` 上指定的 L2 输出预言机合约。

如果提供了 `l2OutputOracleAddress`，则 `targetChain` 参数变为可选。

```ts
const output = await publicClientL1.getL2Output({
  l2BlockNumber,
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```