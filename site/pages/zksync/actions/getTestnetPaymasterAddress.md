---
description: 返回测试网中的 Paymaster 地址。
---

# getTestnetPaymasterAddress

返回测试网中的 Paymaster 地址。

## 使用方法

:::code-group

```ts [example.ts]
import { client } from './config'
const address = await client.getTestnetPaymasterAddress();
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

## 返回值 

`Address | null`

如果可用，则返回测试网 Paymaster 地址，或者返回 `null`。