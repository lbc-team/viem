---
description: 返回基础代币 L1 地址。
---

# getBaseTokenL1Address

返回基础 L1 代币的地址。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const address = await client.getBaseTokenL1Address();
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

`地址`

基础代币 L1 地址。