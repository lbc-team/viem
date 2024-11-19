---
description: 获取指定地址的主名称。
---

# getEnsName

获取指定地址的主名称。

在 ENS 通用解析器合约上调用 `reverse(bytes)` 以“反向解析”地址到主 ENS 名称。

## 用法

:::code-group

```ts [example.ts]
import { publicClient } from './client'
 
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
})
// 'wevm.eth'
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

## 返回值

`string`

指定地址的主 ENS 名称。

如果地址没有分配主名称，则返回 `null`。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

要获取主 ENS 名称的地址。

```ts
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值:** `'latest'`

要执行读取的区块标签。

```ts
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  blockTag: 'safe', // [!code focus]
})
```

### gatewayUrls (可选)

- **类型:** `string[]`

一组通用解析器网关，用于解析通过 ENS 通用解析器合约发出的 CCIP-Read 请求。

```ts
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  gatewayUrls: ["https://ccip.ens.xyz"], // [!code focus]
})
```

### strict (可选)

- **类型:** `boolean`
- **默认值:** `false`

一个布尔值，当设置为 true 时，将严格传播所有 ENS 通用解析器合约错误。

```ts
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  strict: true, // [!code focus]
})
```

### universalResolverAddress (可选)

- **类型:** [`Address`](/docs/glossary/types#address)
- **默认值:** `client.chain.contracts.ensUniversalResolver.address`

ENS 通用解析器合约的地址。

```ts
const ensName = await publicClient.getEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```

## 实时示例

查看下面的实时 [ENS 示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/ens) 中 `getEnsName` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/ens?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>