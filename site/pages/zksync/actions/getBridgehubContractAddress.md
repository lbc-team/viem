---
description: 返回 Bridgehub 智能合约地址。
---

# getBridgehubContractAddress

返回 Bridgehub 智能合约地址。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const address = await client.getBridgehubContractAddress();
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

`Address`

Bridgehub 智能合约地址。