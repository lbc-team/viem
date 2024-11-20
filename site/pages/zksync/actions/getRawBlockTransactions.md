---
description: 返回区块中的交易数据。
---

# getRawBlockTransaction

返回区块中的交易数据。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'


const rawTx = await client.getRawBlockTransaction({
  number: 1
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

`RawBlockTransactions`

区块中的交易数据。

## 参数

### number

区块编号。

```ts
const rawTx = await client.getRawBlockTransaction({
  number: 1  // [!code focus]
});
```