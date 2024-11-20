---
description: 根据哈希值检索用户操作的信息。
---

# getUserOperation

根据哈希值检索用户操作的信息。

## 用法

:::code-group

```ts twoslash [example.ts]
import { bundlerClient } from './client'

const result = await bundlerClient.getUserOperation({ // [!code focus:99]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
})
```

```ts twoslash [client.ts] filename="client.ts"
import { http } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'

export const bundlerClient = createBundlerClient({
  chain: mainnet,
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

:::

:::info
上面的 Bundler URL 是一个公共端点。请不要在生产环境中使用，因为你可能会受到速率限制。考虑使用 [Pimlico's Bundler](https://www.pimlico.io)、[Biconomy's Bundler](https://www.biconomy.io) 或其他 Bundler 服务。
:::

## 返回

```ts
{
  blockHash: Hash,
  blockNumber: bigint,
  entryPoint: Address,
  transactionHash: Hash,
  userOperation: UserOperation
}
```

用户操作信息。

## 参数

### hash

- **类型:** `'0x${string}'`

用户操作哈希。

```ts twoslash
import { bundlerClient } from './client'
// ---cut---
const result = await publicClient.getUserOperation({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```