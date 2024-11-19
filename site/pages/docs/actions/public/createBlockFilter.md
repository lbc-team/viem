# createBlockFilter [用于创建新区块过滤器的操作。]

创建一个过滤器，以监听可以与 [`getFilterChanges`](/docs/actions/public/getFilterChanges) 一起使用的新区块哈希。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createBlockFilter() // [!code focus:99]
// @log: { id: "0x345a6572337856574a76364e457a4366", type: 'block' }
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

[`eth_newBlockFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newBlockFilter)