---
description: 返回主 ZKsync 合约的地址。
---

# getMainContractAddress

返回主 ZKsync 合约的地址。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const address = await client.getMainContractAddress();
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

主 ZKsync Era 智能合约地址。