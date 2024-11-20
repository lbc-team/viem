---
description: 从签名的授权对象中恢复原始签名地址。
---

# recoverAuthorizationAddress

从签名的授权对象中恢复原始签名地址。

## 导入

```ts twoslash
import { recoverAuthorizationAddress } from 'viem/experimental'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { recoverAuthorizationAddress } from 'viem/experimental' // [!code focus]
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  authorization: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'
})

const address = await recoverAuthorizationAddress({ // [!code focus]
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

`地址`

签署授权对象的地址。

## 参数

### authorization

- **类型:** `Authorization | SignedAuthorization`

被签名的授权对象。

```ts twoslash
import { recoverAuthorizationAddress } from 'viem/experimental'
import { walletClient } from './client'
  // ---cut---
const authorization = await walletClient.signAuthorization({
  authorization: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'
})
const address = await recoverAuthorizationAddress({
  authorization, // [!code focus]
}) 
```

### signature

- **类型:** `Hex | ByteArray | Signature | SignedAuthorization`

通过使用地址的私钥签署授权对象生成的签名。

```ts twoslash
import { recoverAuthorizationAddress } from 'viem/experimental'
import { walletClient } from './client'
  // ---cut---
const signature = await walletClient.signAuthorization({
  contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  chainId: 1,
  nonce: 0,
})

const address = await recoverAuthorizationAddress({
  authorization: {
    contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    chainId: 1,
    nonce: 0,
  },
  signature, // [!code focus]
}) 
```