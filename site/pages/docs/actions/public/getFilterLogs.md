---
description: 返回自过滤器创建以来的事件日志列表。
---

# getFilterLogs

返回自过滤器创建以来的**事件**日志列表。

注意：`getFilterLogs` 仅与 **事件过滤器** 兼容。

## 用法

:::code-group

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem'
import { publicClient } from './client'

const filter = await publicClient.createEventFilter({ // [!code focus:99]
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
})
const logs = await publicClient.getFilterLogs({ filter })
// @log: [{ ... }, { ... }, { ... }]
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

[`Log[]`](/docs/glossary/types#log)

事件日志列表。

## 参数

### filter

- **类型:** [`Filter`](/docs/glossary/types#filter)

一个 **事件** 过滤器。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createEventFilter()
const logs = await publicClient.getFilterChanges({
  filter, // [!code focus]
})
```

## JSON-RPC 方法

[`eth_getFilterLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs)