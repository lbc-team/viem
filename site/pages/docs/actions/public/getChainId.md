---
description: 返回与当前网络关联的链 ID
---

# getChainId

返回与当前网络关联的链 ID

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const chainId = await publicClient.getChainId() // [!code focus:99]
// @log: 1
```

```ts [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## 返回

`number`

当前链 ID。

## JSON-RPC 方法

- 调用 [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)。