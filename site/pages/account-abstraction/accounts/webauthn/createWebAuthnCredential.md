# createWebAuthnCredential

注册一个 **WebAuthn Credential**，旨在用于创建一个 [WebAuthn Account](/account-abstraction/accounts/webauthn/toWebAuthnAccount)。

:::note
此函数在底层使用 [`webauthn-p256` 库](https://github.com/wevm/webauthn-p256)。
:::

## 导入

```ts twoslash
import { createWebAuthnCredential } from 'viem/account-abstraction'
```

## 用法

```ts twoslash
import { 
  createWebAuthnCredential, 
  toWebAuthnAccount 
} from 'viem/account-abstraction'

// 注册一个凭证（即通行证）。 // [!code focus]
const credential = await createWebAuthnCredential({ // [!code focus]
  name: 'Example', // [!code focus]
}) // [!code focus]

// 从凭证创建一个 WebAuthn 账户。
const account = toWebAuthnAccount({
  credential,
})
```

## 返回

`P256Credential`

一个 P-256 WebAuthn Credential。

## 参数

### challenge

- **类型:** `Uint8Array`

一个用作加密挑战的 `ArrayBuffer`、`TypedArray` 或 `DataView`。

```ts twoslash
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
const credential = await createWebAuthnCredential({
  challenge: new Uint8Array([1, 2, 3]), // [!code focus]
  name: 'Example',
})
```

### createFn

- **类型:** `(options: CredentialCreationOptions) => Promise<Credential | null>`
- **默认值:** `window.navigator.credentials.create`

凭证创建函数。对于不原生支持 WebAuthn API 的环境（即 React Native 或测试环境）非常有用。

```ts twoslash
// @noErrors
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
import * as passkey from 'react-native-passkeys' // [!code focus]

const credential = await createWebAuthnCredential({
  name: 'Example',
  createFn: passkey.create, // [!code focus]
})

const account = toWebAuthnAccount({
  credential,
})
```

### excludeCredentialIds

- **类型:** `string[]`

要排除在创建中的凭证 ID 列表。此属性可用于防止创建已存在的凭证。

```ts twoslash
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
const credential = await createWebAuthnCredential({
  excludeCredentialIds: ['abc', 'def'], // [!code focus]
  name: 'Example',
})
```

### name

- **类型:** `string`

用于标识凭证的名称。

```ts twoslash
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
const credential = await createWebAuthnCredential({
  name: 'Example', // [!code focus]
})

const account = toWebAuthnAccount({
  credential,
})
```

### rp

- **类型:** `{ id: string; name: string }`

描述请求凭证创建的依赖方的对象。

```ts twoslash
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
const credential = await createWebAuthnCredential({
  name: 'Example',
  rp: { // [!code focus]
    id: 'example.com', // [!code focus]
    name: 'Example', // [!code focus]
  }, // [!code focus]
})

const account = toWebAuthnAccount({
  credential,
})
```

### timeout

- **类型:** `number`

一个数值提示，以毫秒为单位，指示调用的 Web 应用程序愿意等待创建操作完成的时间。

```ts twoslash
import { createWebAuthnCredential, toWebAuthnAccount } from 'viem/account-abstraction'
// ---cut---
const credential = await createWebAuthnCredential({
  name: 'Example',
  timeout: 1000, // [!code focus]
})

const account = toWebAuthnAccount({
  credential,
})
```