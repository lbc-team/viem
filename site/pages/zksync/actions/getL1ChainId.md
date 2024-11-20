---
description: 返回底层 L1 网络的链 ID。
---

# getL1ChainId

返回底层 L1 网络的链 ID。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const chainId = await client.getL1ChainId();
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

L1 链 ID。