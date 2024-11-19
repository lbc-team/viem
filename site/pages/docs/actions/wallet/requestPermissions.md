---
description: 请求钱包权限。
---

# requestPermissions

请求钱包权限。

## 用法

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const permissions = await walletClient.requestPermissions({ eth_accounts: {} }) // [!code focus:99]
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::

## 返回值

[`WalletPermission[]`](/docs/glossary/types#walletpermission)

钱包权限。

## JSON-RPC 方法

[`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255)