---
description: 签署 EIP-7702 授权对象。
---

# signAuthorization

签署一个 [EIP-7702 授权](https://eips.ethereum.org/EIPS/eip-7702)。签署的授权可以在交易 API 中使用，如 [`sendTransaction`](/docs/actions/wallet/sendTransaction#authorizationlist-optional) 和 [`writeContract`](/docs/contract/writeContract#authorizationlist-optional)，以在执行时将授权的合约字节码注入到账户中。

## 用法

通过提供 `contractAddress` 可以授权一个合约。默认情况下，它将基于账户的下一个可用 nonce 和当前链 ID 进行签署。你也可以 [显式设置 `nonce` 和 `chainId`](#scoping)。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const authorization = await walletClient.signAuthorization({ // [!code focus]
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
}) // [!code focus]
// @log: {
// @log:   chainId: 1,
// @log:   contractAddress: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
// @log:   nonce: 1,
// @log:   r: "0xf507fb8fa33ffd05a7f26c980bbb8271aa113affc8f192feba87abe26549bda1",
// @log:   s: "0x1b2687608968ecb67230bbf7944199560fa2b3cffe9cc2b1c024e1c8f86a9e08",
// @log:   yParity: 0,
// @log: }

const hash = await walletClient.sendTransaction({
  authorizationList: [authorization],
  data: '0xdeadbeef',
  to: walletClient.account.address,
})
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

### 显式作用域

我们可以通过将 `nonce` 和/或 `chainId` 作为参数提供来显式签署：

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const authorization = await walletClient.signAuthorization({
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  chainId: 10, // [!code focus]
  nonce: 420, // [!code focus]
})
// @log: {
// @log:   chainId: 10,
// @log:   contractAddress: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
// @log:   nonce: 420,
// @log:   r: "0xf507fb8fa33ffd05a7f26c980bbb8271aa113affc8f192feba87abe26549bda1",
// @log:   s: "0x1b2687608968ecb67230bbf7944199560fa2b3cffe9cc2b1c024e1c8f86a9e08",
// @log:   yParity: 0,
// @log: }

const hash = await walletClient.sendTransaction({
  authorizationList: [authorization],
  data: '0xdeadbeef',
  to: walletClient.account.address,
})
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

`SignedAuthorization`

一个签署的授权对象。

## 参数

### account

- **类型:** `Account`

用于授权将 [合约 (`authorization`)](#authorization) 注入到账户中的账户。

接受 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  account: privateKeyToAccount('0x...'), // [!code focus]
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'
}) 
```

### chainId（可选）

- **类型:** `Address`
- **默认:** `client.chain.id` 或网络链 ID

要将授权作用域限制到的链 ID。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  chainId: 1, // [!code focus]
}) 
```

### contractAddress

- **类型:** `Address`

要注入到账户中的目标合约。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2' // [!code focus]
}) 
```

### delegate（可选）

- **类型:** `true | Address | Account`

EIP-7702 交易是否将由另一个账户执行。

如果未指定，将假定 EIP-7702 交易将由签署授权的账户执行。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  delegate: true, // [!code focus]
}) 
```

### nonce（可选）

- **类型:** `Address`
- **默认:** 账户的下一个可用 nonce。

要将授权作用域限制到的 nonce。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
import { walletClient } from './client'

const authorization = await walletClient.signAuthorization({
  account: privateKeyToAccount('0x...'),
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  nonce: 69, // [!code focus]
}) 
```