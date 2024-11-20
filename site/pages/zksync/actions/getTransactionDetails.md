---
description: 根据交易哈希返回特定交易的数据。
---

# getTransactionDetails

根据交易哈希返回特定交易的数据。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const details = await client.getTransactionDetails({
  txHash: '0x...'
});
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

`TransactionDetails`

根据交易哈希返回特定交易的数据。

## 参数

`GetTransactionDetailsParameters`

### hash

交易哈希

```ts
const details = await client.getTransactionDetails({
  txHash: '0x...' // [!code focus]
});
```