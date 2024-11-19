---
description: 返回当前待纳入下一个区块的所有交易的摘要。
---

# getTxpoolStatus

返回当前待纳入下一个区块的所有交易的摘要，以及仅被安排用于未来执行的交易。 [阅读更多](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-txpool) 。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

const status = await testClient.getTxpoolStatus() // [!code focus]
```

```ts [client.ts]
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'

export const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
```

:::

## 返回

交易池状态。 [查看这里](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-txpool) 。