---
description: 返回一个交易的每单位 gas 费用（以 wei 为单位）的估算值，该交易可能会被包含在下一个区块中。
---

# estimateFeesPerGas 

返回一个交易的每单位 gas 费用（以 wei 为单位）的估算值，该交易可能会被包含在下一个区块中。

如果 [`chain.fees.estimateFeesPerGas`](/docs/actions/public/estimateFeesPerGas) 在 [Client Chain](/docs/clients/public#chain-optional) 或 [override Chain](#chain-optional) 上被设置，它将使用返回的值。

否则，对于 EIP-1559 交易，viem 将使用区块的每单位 gas 基础费用（以推导 `maxFeePerGas`）和 [`estimateMaxPriorityFeePerGas` Action](/docs/actions/public/estimateMaxPriorityFeePerGas)（以推导 `maxPriorityFeePerGas`）的组合来估算费用。对于传统交易，viem 将根据 gas 价格（通过 [`getGasPrice` Action](/docs/actions/public/getGasPrice)）来估算费用。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const {
  maxFeePerGas,
  maxPriorityFeePerGas
} = await publicClient.estimateFeesPerGas()
// @log: {
// @log:   maxFeePerGas: 15_000_000_000n,
// @log:   maxPriorityFeePerGas: 1_000_000_000n,
// @log: }

const { gasPrice } = await publicClient.estimateFeesPerGas({
  type: 'legacy'
})
// @log: { gasPrice: 15_000_000_000n } 
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## 返回值

[`FeeValues`](/docs/glossary/types#feevalues)

每单位 gas 费用的估算值（以 wei 为单位）。

## 参数

### chain（可选）

- **类型：** [Chain](/docs/glossary/types#chain)
- **默认值：** [`client.chain`](/docs/clients/public#chain-optional)

可选的链覆盖。用于从 [`chain.fees.estimateFeesPerGas`](/docs/actions/public/estimateFeesPerGas) 推导每单位 gas 费用。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { optimism } from 'viem/chains' // [!code focus]

const { maxFeePerGas, maxPriorityFeePerGas } = 
  await publicClient.estimateFeesPerGas({
    chain: optimism // [!code focus]
  })
```

### type（可选）

- **类型：** `"legacy" | "eip1559"`
- **默认值：** `"eip1559"`

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const { gasPrice } = await publicClient.estimateFeesPerGas({
  type: 'legacy' // [!code focus]
})
```