# Coinbase 智能钱包

`toCoinbaseSmartAccount` 实现引用了 [Coinbase 智能钱包](https://github.com/coinbase/smart-wallet) 合约。

## 用法

:::code-group

```ts twoslash [example.ts]
import { toCoinbaseSmartAccount } from 'viem/account-abstraction' // [!code focus]
import { client } from './client.js'
import { owner } from './owner.js'

const account = await toCoinbaseSmartAccount({ // [!code focus]
  client, // [!code focus]
  owners: [owner], // [!code focus]
}) // [!code focus]
```

```ts twoslash [client.ts] filename="config.ts"
import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
 
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

```ts twoslash [owner.ts (私钥)] filename="owner.ts"
import { privateKeyToAccount } from 'viem/accounts'
 
export const owner = privateKeyToAccount('0x...')
```

```ts twoslash [owner.ts (密码钥匙)] filename="owner.ts"
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'

// 注册凭证（即密码钥匙）。
const credential = await createWebAuthnCredential({ name: 'Wallet' })
 
// 从凭证创建一个 WebAuthn 拥有者账户。
export const owner = toWebAuthnAccount({ credential })
```

:::

:::tip
**提示：** 你可以使用密码钥匙（WebAuthn）来签署用户操作。请查看 **owner.ts (密码钥匙)** 标签。
:::

## 返回

`SmartAccount<CoinbaseSmartAccountImplementation>`

## 参数

### client

- **类型：** `Client`

用于检索智能账户数据的客户端。

```ts
const client = createPublicClient({ // [!code focus]
  chain: mainnet, // [!code focus]
  transport: http(), // [!code focus]
}) // [!code focus]

const account = await toCoinbaseSmartAccount({
  client, // [!code focus]
  owners: [owner],
})
```

### owners

- **类型：** `(LocalAccount | WebAuthnAccount)[]`

智能账户的拥有者。可以是 [本地账户](/docs/accounts/local) 或 [WebAuthn 账户（密码钥匙）](/account-abstraction/accounts/webauthn)。

```ts
const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')], // [!code focus]
})
```

### ownerIndex（可选）

- **类型：** `number`

用于签署消息和用户操作的拥有者索引。

```ts
const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...'), privateKeyToAccount('0x...')],
  ownerIndex: 1, // [!code focus]
})
```

### nonce（可选）

- **类型：** `bigint`

用于智能账户的随机数。

```ts
const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
  nonce: 1n, // [!code focus]
})
```