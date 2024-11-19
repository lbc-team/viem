---
description: 返回一个估算的最大优先费用（以 wei 为单位），用于交易可能被包含在下一个区块中。
---

# estimateMaxPriorityFeePerGas

返回一个估算的最大优先费用（以 wei 为单位），用于交易可能被包含在下一个区块中。

如果在 [Client Chain](/docs/clients/public#chain-optional) 或 [override Chain](#chain-optional) 上设置了 [`chain.fees.defaultPriorityFee`](/docs/chains/fees#feesdefaultpriorityfee)，将使用该值。

否则，Action 将调用 [`eth_maxPriorityFeePerGas`](https://github.com/ethereum/execution-apis/blob/fe8e13c288c592ec154ce25c534e26cb7ce0530d/src/eth/fee_market.yaml#L9-L16)（如果支持）或根据当前区块的基础费用加上 gas 价格手动计算最大优先费用。

## 使用方法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const maxPriorityFeePerGas = await publicClient.estimateMaxPriorityFeePerGas()
// @log: 输出: 1_000_000_000n
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

`bigint`

最大优先费用的估算值（以 wei 为单位）。

## 参数

### chain（可选）

- **类型:** [Chain](/docs/glossary/types#chain)
- **默认:** [`client.chain`](/docs/clients/public#chain-optional)

可选的链覆盖。用于从 [`chain.fees.defaultPriorityFee`](/docs/chains/fees#feesdefaultpriorityfee) 推断默认的 `maxPriorityFeePerGas`。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { optimism } from 'viem/chains' // [!code focus]

const maxPriorityFeePerGas = 
  await publicClient.estimateMaxPriorityFeePerGas({
    chain: optimism // [!code focus]
  })
```