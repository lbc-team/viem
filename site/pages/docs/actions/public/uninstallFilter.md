---
description: 销毁一个过滤器。
---

# uninstallFilter

销毁一个从以下操作之一创建的 [`Filter`](/docs/glossary/types#filter)：

- [`createBlockFilter`](/docs/actions/public/createBlockFilter)
- [`createEventFilter`](/docs/actions/public/createEventFilter)
- [`createPendingTransactionFilter`](/docs/actions/public/createPendingTransactionFilter)

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createPendingTransactionFilter()
const uninstalled = await publicClient.uninstallFilter({ filter }) // [!code focus:99]
// true
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

`boolean`

一个布尔值，指示过滤器是否成功卸载。

## 参数

### filter

- **类型：** [`Filter`](/docs/glossary/terms#filter)

一个创建的过滤器。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createPendingTransactionFilter()
const uninstalled = await publicClient.uninstallFilter({
  filter, // [!code focus]
})
```

## JSON-RPC 方法

[`eth_uninstallFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallFilter)