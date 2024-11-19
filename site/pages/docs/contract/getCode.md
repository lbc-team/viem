---
description: 检索地址处的字节码。
---

# getCode

检索地址处的字节码。

## 用法

:::code-group

```ts [example.ts]
import { publicClient } from './client'

const bytecode = await publicClient.getCode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
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

合约的字节码。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const bytecode = await publicClient.getCode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

要执行字节码读取的区块号。

```ts
const bytecode = await publicClient.getCode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值:** `'latest'`

要执行字节码读取的区块标签。

```ts
const bytecode = await publicClient.getCode({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  blockTag: 'safe', // [!code focus]
})
```

## JSON-RPC 方法

[`eth_getCode`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)