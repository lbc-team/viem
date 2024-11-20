---
description: 返回最新的 L1 批次号。
---

# getL1BatchNumber

返回最新的 L1 批次号。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const latestNumber = await client.getL1BatchNumber();
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

`Hex`

最新的 L1 批次号。