---
description: 请求由钱包管理的账户列表。
---

# requestAddresses

请求由钱包管理的账户列表。

`requestAddresses` 向钱包发送请求，请求访问用户的账户权限。在用户接受请求后，它将返回一个账户（地址）列表。

此 API 对于需要访问用户账户以执行交易或与智能合约交互的 dapp 非常有用。

## 用法

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const accounts = await walletClient.requestAddresses() // [!code focus:99]
// ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::

## 返回

[`Address[]`](/docs/glossary/types#address)

## JSON-RPC 方法

[`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102)