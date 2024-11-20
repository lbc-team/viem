---
description: 返回捆绑器支持的入口点。
---

# getSupportedEntryPoints

返回捆绑器支持的入口点。

## 用法

:::code-group

```ts twoslash [example.ts]
import { bundlerClient } from './client'

const entryPoints = await bundlerClient.getSupportedEntryPoints() // [!code focus:99]
// @log: ["0x0000000071727De22E5E9d8BAf0edAc6f37da032"]
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
上面的捆绑器 URL 是一个公共端点。请不要在生产环境中使用，因为你可能会受到速率限制。考虑使用 [Pimlico's Bundler](https://www.pimlico.io)、[Biconomy's Bundler](https://www.biconomy.io) 或其他捆绑器服务。
:::

## 返回

`readonly Address[]`

捆绑器支持的入口点。