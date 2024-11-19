---
description: 返回指定账户的账户和存储值，包括默克尔证明。
---

# getProof

返回指定账户的账户和存储值，包括默克尔证明。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const proof = await publicClient.getProof({ 
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
})
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { optimism } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: optimism,
  transport: http()
})
```

:::

## 返回

`Proof`

证明数据。

## 参数

### address

- **类型:** `bigint`

账户地址。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const proof = await publicClient.getProof({
  address: '0x4200000000000000000000000000000000000016', // [!code focus]
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
  blockNumber: 42069n
})
```

### storageKeys

- **类型:** `Hash[]`

应被证明并包含的存储键数组。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const proof = await publicClient.getProof({
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [ // [!code focus:3]
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
  blockNumber: 42069n
})
```

### blockNumber (可选)

- **类型:** `bigint`

在给定区块号的证明。

```ts
const proof = await publicClient.getProof({
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
  blockNumber: 42069n // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

在给定区块标签的证明。

```ts
const proof = await publicClient.getProof({
  address: '0x4200000000000000000000000000000000000016',
  storageKeys: [
    '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
  ],
  blockTag: 'latest' // [!code focus]
})
```

## JSON-RPC 方法

- 调用 [`eth_getProof`](https://eips.ethereum.org/EIPS/eip-1186).