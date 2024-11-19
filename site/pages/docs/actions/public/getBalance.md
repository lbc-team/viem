---
description: 返回地址的余额（以 wei 为单位）。
---

# getBalance

返回地址的余额（以 wei 为单位）。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const balance = await publicClient.getBalance({ // [!code focus:4]
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
// @log: > 10000000000000000000000n (wei)
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/publicClient.ts]
```

:::

## 返回值

`bigint`

地址的余额（以 wei 为单位）。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

账户的地址。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const balance = await publicClient.getBalance({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
})
```

### blockNumber（可选）

- **类型:** `bigint`

在特定区块号下账户的余额。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const balance = await publicClient.getBalance({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  blockNumber: 69420n  // [!code focus]
})
```

### blockTag（可选）

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

在特定区块标签下账户的余额。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const balance = await publicClient.getBalance({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  blockTag: 'safe'  // [!code focus]
})
```

## 提示

- 你可以使用 [`formatEther`](/docs/utilities/formatEther) 将余额转换为以太单位。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { formatEther } from 'viem' // [!code focus]

const balance = await publicClient.getBalance({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  blockTag: 'safe'
})
const balanceAsEther = formatEther(balance) // [!code focus:2]
// "6.942"
```

## JSON-RPC 方法

[`eth_getBalance`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)