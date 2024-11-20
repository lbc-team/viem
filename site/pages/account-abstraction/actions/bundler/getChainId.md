---
description: 返回与打包器关联的链 ID
---

# getChainId

返回与打包器关联的链 ID

## 用法

:::code-group

```ts twoslash [example.ts]
import { bundlerClient } from './client'

const chainId = await bundlerClient.getChainId() // [!code focus:99]
// @log: 1
```

```ts twoslash [client.ts] filename="client.ts"
import { http } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction'

export const bundlerClient = createBundlerClient({
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

:::

:::info
上面的打包器 URL 是一个公共端点。请不要在生产环境中使用，因为你可能会受到速率限制。考虑使用 [Pimlico's Bundler](https://www.pimlico.io)、[Biconomy's Bundler](https://www.biconomy.io) 或其他打包器服务。
:::

## 返回

`number`

当前链 ID。