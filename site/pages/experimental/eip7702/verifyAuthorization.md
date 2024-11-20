---
description: 验证授权对象是否由提供的地址签名。
---

# verifyAuthorization

验证授权对象是否由提供的地址签名。

## 导入

```ts twoslash
import { verifyAuthorization } from 'viem/experimental'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { verifyAuthorization } from 'viem/experimental' // [!code focus]
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  authorization: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'
})

const valid = await verifyAuthorization({ // [!code focus]
  address: walletClient.account.address, // [!code focus]
  authorization, // [!code focus]
}) // [!code focus]
```

```ts twoslash [client.ts] filename="client.ts"
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { eip7702Actions } from 'viem/experimental'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'),
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
```

:::

## 返回

`boolean`

签名是否对提供的授权对象有效。

## 参数

### address

- **类型:** `Address`

签署授权对象的地址。

```ts twoslash
import { verifyAuthorization } from 'viem/experimental'
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  authorization: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'
})
// ---cut---
const valid = await verifyAuthorization({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // [!code focus]
  authorization,
}) 
```

### authorization

- **类型:** `Authorization | SignedAuthorization`

要验证的授权对象。

```ts twoslash
import { verifyAuthorization } from 'viem/experimental'
import { walletClient } from './client'
// ---cut---
const authorization = await walletClient.signAuthorization({
  authorization: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'
})

const valid = await verifyAuthorization({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  authorization, // [!code focus]
}) 
```

### signature

- **类型:** `Hex | ByteArray | Signature | SignedAuthorization`

通过使用地址的私钥签署授权对象生成的签名。

```ts twoslash
import { verifyAuthorization } from 'viem/experimental'
import { walletClient } from './client'
// ---cut---
const signature = await walletClient.signAuthorization({
  authorization: {
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    chainId: 1,
    nonce: 0,
  }
})

const valid = await verifyAuthorization({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  authorization: {
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    chainId: 1,
    nonce: 0,
  },
  signature, // [!code focus]
}) 
```