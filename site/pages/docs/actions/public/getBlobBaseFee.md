---
description: 返回当前的 blob 基础费用（以 wei 为单位）。
---

# getBlobBaseFee

返回当前的 blob 基础费用（以 wei 为单位）。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const baseFee = await publicClient.getBlobBaseFee() // [!code focus]
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

`bigint`

blob 基础费用（以 wei 为单位）。

## JSON-RPC 方法

[`eth_blobBaseFee`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice)