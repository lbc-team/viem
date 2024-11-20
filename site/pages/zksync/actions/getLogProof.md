---
description: 给定一个交易哈希和在交易中生成的 L2 到 L1 日志的索引，它返回相应 L2 到 L1 日志的证明。
---

# getLogProof

返回相应 L2 到 L1 日志的证明。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const proof = await client.getLogProof({
  txHash: '0x...',
  index: 1
});
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { zksync } from 'viem/chains'
import { publicActionsL2 } from 'viem/zksync'

export const client = createPublicClient({
  chain: zksync,
  transport: http(),
}).extend(publicActionsL2())
```
:::

## 返回 

`GetLogProofReturnType`

相应 L2 到 L1 日志的证明

## 参数

### txHash

生成 L2 到 L1 日志的 L2 交易的哈希。

```ts
const proof = await client.getLogProof({
  txHash: '0x...', // [!code focus]
  index: 1
});
```

### index（可选）

交易中 L2 到 L1 日志的索引。

```ts
const proof = await client.getLogProof({
  txHash: '0x...', 
  index: 1 // [!code focus]
});

```