---
description: 返回由批次编号给定的批次中包含的区块范围。
---

# getL1BatchBlockRange

返回由批次编号给定的批次中包含的区块范围。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const batchBlockRange = await client.getL1BatchBlockRange({
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

`GetL1BatchBlockRangeReturnType`

一个包含两个元素的数组，表示批次中区块的范围。

## 参数

### number

L1 批次编号

- **类型** `number`

```ts
const batchBlockRange = await client.getL1BatchBlockRange({
  number: 1  // [!code focus]
});
```