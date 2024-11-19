---
description: 获取钱包当前的权限。
---

# getPermissions

获取钱包当前的权限。

## 用法

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const permissions = await walletClient.getPermissions() // [!code focus:99]
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::

## 返回

[`WalletPermission[]`](/docs/glossary/types#walletpermission)

钱包权限。

## JSON-RPC 方法

[`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255)