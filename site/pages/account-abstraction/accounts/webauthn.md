# WebAuthn 账户

WebAuthn 账户与 [本地账户](/docs/accounts/local) 几乎相同，但有以下不同之处：

- 使用 **secp256r1** 曲线进行签名
- 在其签名方法中返回 `signature` 和 `webauthn` 数据
- 不能签署交易（交易不支持 **secp256r1** 签名）
- 没有以太坊 `地址`

WebAuthn 账户通常用于 **[智能账户](/account-abstraction/accounts/smart) 所有者** 代表智能账户签署用户操作和消息。

:::note
WebAuthn 账户所有者目前在以下智能账户实现中得到支持：

- [`toCoinbaseSmartAccount`](/account-abstraction/accounts/smart/toCoinbaseSmartAccount#owners)
:::

## 用法

:::code-group

```ts twoslash [example.ts]
import { 
  createWebAuthnCredential, 
  toWebAuthnAccount,
  toCoinbaseSmartAccount 
} from 'viem/account-abstraction'
import { client } from './client'

// 1. 注册凭证（即密码钥匙）。
const credential = await createWebAuthnCredential({
  name: 'Example',
})

// 2. 从凭证创建 WebAuthn 所有者账户。
const owner = toWebAuthnAccount({
  credential,
})

// 3. 将所有者连接到兼容 WebAuthn 的智能账户。
const account = toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

:::