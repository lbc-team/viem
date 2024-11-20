---
description: 返回给定账户的所有已知余额。
---

# getAllBalances

返回给定账户的所有已知余额。

## 用法

:::code-group

```ts [example.ts]
import { client, account } from './config'

const balances = await client.getAllBalances({
  account
});
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { zksync } from 'viem/chains'
import { publicActionsL2 } from 'viem/zksync'

export const client = createPublicClient({
  chain: zksync,
  transport: http(),
}).extend(publicActionsL2())

// JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

```
:::

## 返回

`GetAllBalancesReturnType`

地址的所有已知余额的数组。

## 参数

### account

- **类型:** `Account | Address`

用于检查的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const balances = await client.getAllBalances({
  account: "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049"  // [!code focus]
});
```