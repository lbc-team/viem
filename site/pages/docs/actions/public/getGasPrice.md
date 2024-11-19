---
description: 返回当前的 gas 价格（以 wei 为单位）。
---

# getGasPrice

返回当前的 gas 价格（以 wei 为单位）。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const gasPrice = await publicClient.getGasPrice() // [!code focus:4]
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

gas 价格（以 wei 为单位）。

## JSON-RPC 方法

[`eth_gasPrice`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice)