---
description: 返回一组历史 gas 信息。
---

# getFeeHistory

返回一组历史 gas 信息。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const feeHistory = await publicClient.getFeeHistory({ // [!code focus:4]
  blockCount: 4,
  rewardPercentiles: [25, 75]
})
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

## 返回

[`FeeHistory`](/docs/glossary/types#feehistory)

费用历史。

## 参数

### blockCount

- **类型:** `number`

请求范围内的区块数量。单次查询可以请求 1 到 1024 个区块。如果并非所有区块都可用，可能会返回少于请求的数量。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const feeHistory = await publicClient.getFeeHistory({
  blockCount: 4, // [!code focus]
  rewardPercentiles: [25, 75]
})
```

### rewardPercentiles

- **类型:** `number[]`

一个单调递增的百分位值列表，从每个区块的有效优先费用中按 gas 升序采样，按使用的 gas 加权。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const feeHistory = await publicClient.getFeeHistory({
  blockCount: 4,
  rewardPercentiles: [25, 75] // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

请求范围内的最高区块编号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const feeHistory = await publicClient.getFeeHistory({
  blockCount: 4,
  blockNumber: 1551231n, // [!code focus]
  rewardPercentiles: [25, 75]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值:** `'latest'`

请求范围内的最高区块编号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const feeHistory = await publicClient.getFeeHistory({
  blockCount: 4,
  blockTag: 'safe', // [!code focus]
  rewardPercentiles: [25, 75]
})
```

## JSON-RPC 方法

- 调用 [`eth_feeHistory`](https://docs.alchemy.com/reference/eth-feehistory)。