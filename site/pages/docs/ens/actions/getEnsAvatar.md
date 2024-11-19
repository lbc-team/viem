---
description: 获取 ENS 名称的头像。
---

# getEnsAvatar

获取 ENS 名称的头像。

调用 [`getEnsText`](/docs/ens/actions/getEnsText)，`key` 设置为 `'avatar'`。

## 用法

:::code-group

```ts [example.ts]
import { normalize } from 'viem/ens'
import { publicClient } from './client'
 
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'),
})
// 'https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio'
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'

import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

:::warning
由于 ENS 名称禁止某些禁止字符（例如下划线）并具有其他验证规则，因此在将其传递给 `getEnsAddress` 之前，你可能希望使用 [UTS-46 规范化](https://unicode.org/reports/tr46) 来 [规范化 ENS 名称](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names)。你可以使用内置的 [`normalize`](/docs/ens/utilities/normalize) 函数来实现。
:::

## 返回值

`string | null`

ENS 名称的头像 URI。

如果无法从 ENS 名称解析头像，则返回 `null`。

## 参数

### name

- **类型:** `string`

要获取文本的 ENS 名称。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'), // [!code focus]
})
```

### assetGatewayUrls (可选)

- **类型:** `{ ipfs?: string; arweave?: string }`

用于解析 IPFS 和/或 Arweave 资产的网关 URL。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'),
  assetGatewayUrls: { // [!code focus:3]
    ipfs: 'https://cloudflare-ipfs.com'
  }
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'),
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值:** `'latest'`

要执行读取的区块标签。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'),
  blockTag: 'safe', // [!code focus]
})
```

### gatewayUrls (可选)

- **类型:** `string[]`

一组通用解析器网关，用于解析通过 ENS 通用解析器合约发出的 CCIP-Read 请求。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'), 
  gatewayUrls: ["https://ccip.ens.xyz"], // [!code focus]
})
```

### strict (可选)

- **类型:** `boolean`
- **默认值:** `false`

一个布尔值，当设置为 true 时，将严格传播所有 ENS 通用解析器合约错误。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'), 
  strict: true, // [!code focus]
})
```

### universalResolverAddress (可选)

- **类型:** [`Address`](/docs/glossary/types#address)
- **默认值:** `client.chain.contracts.ensUniversalResolver.address`

ENS 通用解析器合约的地址。

```ts
const ensText = await publicClient.getEnsAvatar({
  name: normalize('wevm.eth'),
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```