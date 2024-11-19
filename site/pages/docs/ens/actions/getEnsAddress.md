---
description: 获取 ENS 名称的地址。
---

# getEnsAddress

获取 ENS 名称的地址。

在 ENS 通用解析器合约上调用 `resolve(bytes, bytes)` 以将 ENS 名称解析为地址。

## 用法

:::code-group

```ts [example.ts]
import { normalize } from 'viem/ens'
import { publicClient } from './client'
 
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'),
})
// '0xd2135CfB216b74109775236E36d4b433F1DF507B'
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

:::

:::warning
由于 ENS 名称禁止某些禁止字符（例如下划线）并具有其他验证规则，因此你可能希望在将其传递给 `getEnsAddress` 之前使用 [UTS-46 规范化](https://unicode.org/reports/tr46) 来[规范化 ENS 名称](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names) 。你可以使用内置的 [`normalize`](/docs/ens/utilities/normalize) 函数来实现。
:::

## 返回

[`Address`](/docs/glossary/types#address)

解析为提供的 ENS 名称的地址。

如果 ENS 名称无法解析为地址，则返回 `null`。

## 参数

### name

- **类型:** `string`

要获取地址的名称。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'), // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'),
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值:** `'latest'`

要执行读取的区块标签。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'),
  blockTag: 'safe', // [!code focus]
})
```

### coinType (可选)

- **类型:** `number`

要获取地址的 [ENSIP-9](https://docs.ens.domains/ens-improvement-proposals/ensip-9-multichain-address-resolution) 币种类型。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'), 
  coinType: 60, // [!code focus]
})
```

### gatewayUrls (可选)

- **类型:** `string[]`

一组通用解析器网关，用于解析通过 ENS 通用解析器合约发出的 CCIP-Read 请求。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'), 
  gatewayUrls: ["https://ccip.ens.xyz"], // [!code focus]
})
```

### strict (可选)

- **类型:** `boolean`
- **默认值:** `false`

一个布尔值，当设置为 true 时，将严格传播所有 ENS 通用解析器合约错误。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'), 
  strict: true, // [!code focus]
})
```

### universalResolverAddress (可选)

- **类型:** [`Address`](/docs/glossary/types#address)
- **默认值:** `client.chain.contracts.ensUniversalResolver.address`

ENS 通用解析器合约的地址。

```ts
const ensAddress = await publicClient.getEnsAddress({
  name: normalize('wevm.eth'),
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```

## 实时示例

查看下面的实时 [ENS 示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/ens) 中 `getEnsAddress` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/ens?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>