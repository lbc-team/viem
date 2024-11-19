---
description: 返回钱包或客户端拥有的地址列表。
---

# getAddresses

返回钱包或客户端拥有的账户地址列表。

## 用法

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const accounts = await walletClient.getAddresses() // [!code focus:99]
// ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::

## 返回

[`Address[]`](/docs/glossary/types#address)

一个包含校验和地址的列表。


## JSON-RPC 方法

[`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)