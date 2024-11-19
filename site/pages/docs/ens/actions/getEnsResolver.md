---
description: 获取 ENS 名称的解析器。
---

# getEnsResolver

获取 ENS 名称的解析器。

在 ENS 通用解析器合约上调用 `findResolver(bytes)` 以检索 ENS 名称的解析器。

## 用法

:::code-group

```ts [example.ts]
import { normalize } from 'viem/ens'
import { publicClient } from './client'
 
const resolverAddress = await publicClient.getEnsResolver({
  name: normalize('wevm.eth'),
})
// '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
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
由于 ENS 名称禁止某些禁止字符（例如下划线）并具有其他验证规则，因此你可能希望在将其传递给 `getEnsResolver` 之前使用 [UTS-46 规范化](https://unicode.org/reports/tr46) 来 [规范化 ENS 名称](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names)。你可以使用内置的 [`normalize`](/docs/ens/utilities/normalize) 函数来实现。
:::

## 返回

[`Address`](/docs/glossary/types#address)

解析器的地址。

## 参数

### name

- **类型:** `string`

要获取地址的名称。

```ts
const ensName = await publicClient.getEnsResolver({
  name: normalize('wevm.eth'), // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const ensName = await publicClient.getEnsResolver({
  name: normalize('wevm.eth'),
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

要执行读取的区块标签。

```ts
const ensName = await publicClient.getEnsResolver({
  name: normalize('wevm.eth'),
  blockTag: 'safe', // [!code focus]
})
```

### universalResolverAddress (可选)

- **类型:** [`Address`](/docs/glossary/types#address)
- **默认:** `client.chain.contracts.ensUniversalResolver.address`

ENS 通用解析器合约的地址。

```ts
const ensName = await publicClient.getEnsResolver({
  name: normalize('wevm.eth'),
  universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376', // [!code focus]
})
```