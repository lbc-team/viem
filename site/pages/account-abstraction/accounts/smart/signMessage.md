# signMessage (智能账户)

计算以太坊特定的签名，格式为 [EIP-191](https://eips.ethereum.org/EIPS/eip-191)：`keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`。

使用智能账户的 **Owner** 来签署消息。

## 用法

:::code-group

```ts twoslash [example.ts]
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config.js'

const account = await toSmartAccount({
  client,
  owners: [owner],
})

const signature = await account.signMessage({ // [!code focus]
  message: 'hello world', // [!code focus]
}) // [!code focus]
```

```ts twoslash [config.ts] filename="config.ts"
import { http, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const owner = privateKeyToAccount('0x...')
 
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

:::

## 返回

[`Hex`](/docs/glossary/types#hex)

签名后的消息。

## 参数

### message

- **类型：** `string | { raw: Hex | ByteArray }`

要签名的消息。

默认情况下，viem 签署消息的 UTF-8 表示。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config.js'

const account = await toSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signMessage({
  message: 'hello world', // [!code focus:1]
})
```

要签署消息的数据表示，可以使用 `raw` 属性。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config.js'

const account = await toSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signMessage({
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
})
```