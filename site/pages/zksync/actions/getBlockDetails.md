---
description: 返回关于 L2 区块的额外 ZKsync 特定信息。
---

# getBlockDetails

返回关于 L2 区块的额外 ZKsync 特定信息。

## 用法

:::code-group

```ts [example.ts]
import { client } from './config'

const blockDetails = await client.getBlockDetails({
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

`BaseBlockDetails`

表示关于 L2 区块的 ZKsync 特定信息的结构。

## 参数

### number

区块编号

- **类型** `number`

```ts
const blockDetails = await client.getBlockDetails({
  number: 1 // [!code focus]
}); 
```