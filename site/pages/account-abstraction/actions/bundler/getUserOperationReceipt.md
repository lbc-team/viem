---
description: 返回给定用户操作哈希的用户操作收据。
---

# getUserOperationReceipt

返回给定用户操作哈希的用户操作收据。

## 用法

:::code-group

```ts twoslash [example.ts]
import { bundlerClient } from './client'

const receipt = await bundlerClient.getUserOperationReceipt({ // [!code focus:99]
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d'
})
// @log: {
// @log:   blockHash: '0xaf1dadb8a98f1282e8f7b42cc3da8847bfa2cf4e227b8220403ae642e1173088',
// @log:   blockNumber: 15132008n,
// @log:   sender: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
// @log:   ...
// @log:   status: 'success',
// @log: }
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

`UserOperationReceipt`

用户操作收据。

## 参数

### hash

- **类型:** `'0x${string}'`

用户操作哈希。

```ts twoslash
import { bundlerClient } from './client'
// ---cut---
const receipt = await bundlerClient.getUserOperationReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```