---
description: 返回基于过滤器的日志或哈希列表。
---

# getFilterChanges

返回自上次调用以来基于[过滤器](/docs/glossary/terms#filter)的日志或哈希列表。

可以通过以下操作创建过滤器：

- [`createBlockFilter`](/docs/actions/public/createBlockFilter)
- [`createContractEventFilter`](/docs/contract/createContractEventFilter)
- [`createEventFilter`](/docs/actions/public/createEventFilter)
- [`createPendingTransactionFilter`](/docs/actions/public/createPendingTransactionFilter)

## 用法

### 区块

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createBlockFilter() // [!code focus:99]
const hashes = await publicClient.getFilterChanges({ filter })
// @log: 输出: ["0x10d86dc08ac2f18f00ef0daf7998dcc8673cbcf1f1501eeb2fac1afd2f851128", ...]
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

### 合约事件

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createContractEventFilter({ // [!code focus:99]
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  abi: wagmiAbi,
  eventName: 'Transfer'
})
const logs = await publicClient.getFilterChanges({ filter })
// @log: 输出: [{ ... }, { ... }, { ... }]
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

### 原始事件

:::code-group

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem'
import { publicClient } from './client'

const filter = await publicClient.createEventFilter({ // [!code focus:99]
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
})
const logs = await publicClient.getFilterChanges({ filter })
// @log: 输出: [{ ... }, { ... }, { ... }]
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

### 交易

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createPendingTransactionFilter() // [!code focus:99]
const hashes = await publicClient.getFilterChanges({ filter })
// @log: 输出: ["0x89b3aa1c01ca4da5d15eca9fab459d062db5c0c9b76609acb0741901f01f6d19", ...]
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

## 返回值

[`Log[]`](/docs/glossary/types#log)

如果过滤器是通过`createContractEventFilter`或`createEventFilter`创建的，则返回日志列表。

**或者**

`"0x${string}"[]`

如果过滤器是通过`createPendingTransactionFilter`创建的，则返回交易哈希列表。

**或者**

`"0x${string}"[]`

如果过滤器是通过`createBlockFilter`创建的，则返回区块哈希列表。

## 参数

### filter

- **类型:** [`Filter`](/docs/glossary/types#filter)

已创建的过滤器。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createPendingTransactionFilter()
const logs = await publicClient.getFilterChanges({
  filter, // [!code focus]
})
```

## JSON-RPC 方法

- 调用 [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)。