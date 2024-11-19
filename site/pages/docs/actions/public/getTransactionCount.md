---
description: 返回一个账户发送的交易数量。
---

# getTransactionCount

返回一个账户广播/发送的[交易](/docs/glossary/terms#transaction)数量。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const transactionCount = await publicClient.getTransactionCount({  // [!code focus:99]
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
// @log: > 420
```

```ts [client.ts] filename="client.ts"
// [!include ~/snippets/publicClient.ts]
```

:::

## 返回

`number`

一个账户发送的交易数量。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

账户的地址。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transactionCount = await publicClient.getTransactionCount({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `bigint`

在某个区块号获取计数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transactionCount = await publicClient.getTransactionCount({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  blockNumber: 69420n  // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

在某个区块标签获取计数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const transactionCount = await publicClient.getTransactionCount({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  blockTag: 'safe'  // [!code focus]
})
```

## 注意事项

- 账户的交易数量也可以用作 nonce。

## JSON-RPC 方法

[`eth_getTransactionCount`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)