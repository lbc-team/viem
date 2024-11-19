---
description: 返回给定地址的存储槽中的值。
---

# getStorageAt

返回给定地址的存储槽中的值。

## 用法

:::code-group

```ts [example.ts]
import { toHex } from 'viem'
import { wagmiAbi } from './abi'
import { publicClient } from './client'

const data = await publicClient.getStorageAt({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: toHex(0)
})
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

[`Hex`](/docs/glossary/types#hex)

存储槽的值。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const data = await publicClient.getStorageAt({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  slot: toHex(0)
})
```

### slot

- **类型**: [`Hex`](/docs/glossary/types#hex)

存储位置（以十六进制编码的值）。

```ts
const data = await publicClient.getStorageAt({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: toHex(0) // [!code focus]
})
```

### blockNumber（可选）

- **类型:** `number`

要执行存储槽读取的区块号。

```ts
const bytecode = await publicClient.getStorageAt({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: toHex(0),
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag（可选）

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

要执行存储槽读取的区块标签。

```ts
const bytecode = await publicClient.getStorageAt({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  slot: toHex(0),
  blockTag: 'safe', // [!code focus]
})
```

## JSON-RPC 方法

[`eth_getStorageAt`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat)