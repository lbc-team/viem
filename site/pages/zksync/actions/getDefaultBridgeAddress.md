---
description: 返回 L1 和 L2 上默认 ZKsync Era 桥接合约的地址。
---

# getDefaultBridgeAddresses

返回 L1 和 L2 上默认 ZKsync Era 桥接合约的地址。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const addresses = await client.getDefaultBridgeAddresses();
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

`GetDefaultBridgeAddressesReturnType`

默认 ZKsync Era 桥接合约在 L1 和 L2 上的地址。