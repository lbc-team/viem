# toWebAuthnAccount

创建一个 **WebAuthn 账户** – 通常用于 **[智能账户](/account-abstraction/accounts/smart) 所有者** 代表智能账户签署用户操作和消息。

:::note
当前支持 WebAuthn 账户所有者的智能账户实现包括：

- [`toCoinbaseSmartAccount`](/account-abstraction/accounts/smart/toCoinbaseSmartAccount#owners)
:::

## 导入

```ts twoslash
import { toWebAuthnAccount } from 'viem/account-abstraction'
```

## 用法

```ts twoslash
import { 
  createWebAuthnCredential, 
  toWebAuthnAccount 
} from 'viem/account-abstraction'

// 注册凭证（即密码密钥）。
const credential = await createWebAuthnCredential({
  name: 'Example',
})

// 从凭证创建 WebAuthn 账户。 // [!code focus]
const account = toWebAuthnAccount({ // [!code focus]
  credential, // [!code focus]
}) // [!code focus]
```

## 返回

`WebAuthnAccount`

一个 WebAuthn 账户。

## 参数

### credential

- **类型:** `P256Credential`

一个 P256 WebAuthn 凭证。

```ts twoslash
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
const credential = await createWebAuthnCredential({
  name: 'Example',
})

const account = toWebAuthnAccount({
  credential, // [!code focus]
})
```

### getFn

- **类型:** `(options: CredentialRequestOptions) => Promise<Credential | null>`
- **默认值:** `window.navigator.credentials.get`

凭证请求函数。对于不原生支持 WebAuthn API 的环境（即 React Native 或测试环境）非常有用。

```ts twoslash
// @noErrors
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
import * as passkey from 'react-native-passkeys' // [!code focus]

const credential = await createWebAuthnCredential({
  name: 'Example',
})

const account = toWebAuthnAccount({
  credential,
  getFn: passkey.get, // [!code focus]
})
```

### rpId

- **类型:** `string`
- **默认值:** `window.location.hostname`

依赖方 ID。

```ts twoslash
// @noErrors
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
import * as passkey from 'react-native-passkeys' // [!code focus]

const credential = await createWebAuthnCredential({
  name: 'Example',
})

const account = toWebAuthnAccount({
  credential,
  rpId: 'example.com', // [!code focus]
})
```