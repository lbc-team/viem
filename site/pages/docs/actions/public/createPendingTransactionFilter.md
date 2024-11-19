# createPendingTransactionFilter [用于创建新的待处理交易过滤器的操作。]

创建一个过滤器，以监听可以与 [`getFilterChanges`](/docs/actions/public/getFilterChanges) 一起使用的新待处理交易哈希。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createPendingTransactionFilter() // [!code focus:99]
// @log: 输出: { id: "0x345a6572337856574a76364e457a4366", type: 'transaction' }
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

[`Filter`](/docs/glossary/types#filter)

## JSON-RPC 方法

[`eth_newPendingTransactionFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter)