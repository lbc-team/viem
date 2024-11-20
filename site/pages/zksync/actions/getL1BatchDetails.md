---
description: 返回与给定批次相关的数据。
---

# getL1BatchDetails

返回与给定批次相关的数据。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const batchDetails = await client.getL1BatchDetails({
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

`GetL1BatchDetailsReturnType`

批次详情。

## 参数

### number

L1 批次编号

- **类型** `number`

```ts
const batchDetails = await client.getL1BatchDetails({
  number: 1  // [!code focus]
});
```