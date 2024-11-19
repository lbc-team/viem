---
description: 返回当前待包含在下一个区块中的所有交易的详细信息。
---

# getTxpoolContent

返回当前待包含在下一个区块中的所有交易的详细信息，以及仅被安排用于未来执行的交易。 [阅读更多](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-txpool) 。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'

const content = await testClient.getTxpoolContent() // [!code focus]
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

交易池内容。 [查看这里](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-txpool) 。