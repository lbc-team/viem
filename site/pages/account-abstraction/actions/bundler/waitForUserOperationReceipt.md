---
description: 等待用户操作被包含在区块中，然后返回用户操作收据。
---

# getUserOperationReceipt

等待用户操作被包含在一个 [区块](https://viem.sh/docs/glossary/terms#block) 中（一个确认），然后返回用户操作收据。

## 用法

:::code-group

```ts twoslash [example.ts]
import { bundlerClient } from './client'

const receipt = await bundlerClient.waitForUserOperationReceipt({ // [!code focus:99]
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
const receipt = await bundlerClient.waitForUserOperationReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```

### pollingInterval (可选)

- **类型:** `number`

轮询频率（以毫秒为单位）。

```ts twoslash
import { bundlerClient } from './client'
// ---cut---
const receipt = await bundlerClient.waitForUserOperationReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  pollingInterval: 1_000 // [!code focus]
})
```

### retryCount (可选)

- **类型:** `number`
- **默认:** `6`

重试次数。

```ts twoslash
import { bundlerClient } from './client'
// ---cut---
const receipt = await bundlerClient.waitForUserOperationReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  retryCount: 3 // [!code focus]
})
```

### timeout (可选)

- **类型:** `number`

可选超时（以毫秒为单位），在停止轮询之前等待的时间。

```ts twoslash
import { bundlerClient } from './client'
// ---cut---
const receipt = await bundlerClient.waitForUserOperationReceipt({
  hash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d',
  timeout: 30_000 // [!code focus]
})
```