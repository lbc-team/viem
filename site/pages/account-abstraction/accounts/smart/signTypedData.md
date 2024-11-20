# signTypedData (智能账户)

签名类型化数据并计算以 Ethereum 为特定的签名，参考 [https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712)：`sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))`

使用智能账户的 **Owner** 来签名消息。

## 用法

:::code-group

```ts twoslash [example.ts]
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config.js'
import { domain, types } from './data.js'

const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})

const signature = await account.signTypedData({ // [!code focus]
  domain, // [!code focus]
  types, // [!code focus]
  primaryType: 'Mail', // [!code focus]
  message: { // [!code focus]
    from: { // [!code focus]
      name: 'Cow', // [!code focus]
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', // [!code focus]
    }, // [!code focus]
    to: { // [!code focus]
      name: 'Bob', // [!code focus]
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB', // [!code focus]
    }, // [!code focus]
    contents: 'Hello, Bob!', // [!code focus]
  }, // [!code focus]
}) // [!code focus]
```

```ts twoslash [data.ts] filename="data.ts"
// 域上的所有属性都是可选的
export const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const
 
// 所有类型定义的命名列表
export const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const
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

`0x${string}`

签名的数据。

## 参数

### domain

**类型：** `TypedDataDomain`

类型化数据域。

```ts
const signature = await account.signTypedData({
  domain: { // [!code focus:6]
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types,
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```

### types

类型化数据的类型定义。

```ts
const signature = await account.signTypedData({
  domain,
  types: { // [!code focus:11]
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```

### primaryType

**类型：** 推断的 `string`。

要从 `types` 中提取并在 `value` 中使用的主要类型。

```ts
const signature = await account.signTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [ // [!code focus:5]
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', // [!code focus]
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```

### message

**类型：** 从 `types` 和 `primaryType` 推断。

```ts
const signature = await account.signTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', 
  message: { // [!code focus:11]
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```