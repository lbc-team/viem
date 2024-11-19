# signTransaction (本地账户) [使用账户的私钥签名交易。]

使用账户的私钥签名交易。

## 用法

```ts twoslash
import { parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x...')

const signature = await account.signTransaction({
  chainId: 1,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('3'),
  gas: 21000n,
  nonce: 69,
  to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})
// @log: 输出: "0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33"
```

### 自定义序列化器

viem 内置了 **Legacy**、**EIP-2930** (`0x01`) 和 **EIP-1559** (`0x02`) 交易类型的序列化器。如果你想要序列化 viem 不支持的其他交易类型，可以传递自定义序列化器。

```ts 
import { parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x...')

const signature = await account.signTransaction({
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('3'),
  gas: 21000n,
  nonce: 69,
  to: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
}, {
  serializer(transaction) { // [!code focus:16]
    const {
      chainId,
      nonce,
      // ...
    } = transaction

    return concatHex([
      '0x69',
      toRlp([
        toHex(chainId),
        nonce ? toHex(nonce) : '0x',
        // ...
      ]),
    ])
  }
})
```

## 返回

[`Hex`](/docs/glossary/types#Hex)

签名的交易。

## 参数

### accessList (可选)

- **类型:** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  accessList: [ // [!code focus:6]
    {
      address: '0x1',
      storageKeys: ['0x1'],
    },
  ],
  chainId: 1,
})
```

### authorizationList (可选)

- **类型:** `AuthorizationList`

签名的 EIP-7702 授权列表。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const authorization = await account.experimental_signAuthorization({
  contractAddress: '0x...',
  chainId: 1,
  nonce: 1,
})

const signature = await account.signTransaction({
  authorizationList: [authorization], // [!code focus]
  chainId: 1,
})
```

### blobs (可选)

- **类型:** `Hex[]`

用于 [Blob 交易](/docs/guides/blob-transactions) 的 blobs。

```ts
import * as kzg from 'c-kzg'
import { toBlobs, stringToHex } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) 

const hash = await account.signTransaction({
  blobs: toBlobs({ data: stringToHex('blobby blob!') }), // [!code focus]
  kzg,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
})
```

### chainId (可选)

- **类型:** `number`

链 ID。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  chainId: 1, // [!code focus]
})
```

### data (可选)

- **类型:** `0x${string}`

交易数据。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // [!code focus]
})
```

### gas (可选)

- **类型:** `bigint`

交易的 gas 限制。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  gas: 69420n, // [!code focus]
})
```

### gasPrice (可选)

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [Legacy 交易](/docs/glossary/terms#legacy-transaction)。

```ts twoslash
import { parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  gasPrice: parseGwei('20'), // [!code focus]
})
```

### kzg (可选)

- **类型:** `KZG`

用于 [Blob 交易](/docs/guides/blob-transactions) 的 KZG 实现。

有关更多信息，请参见 [`setupKzg`](/docs/utilities/setupKzg)。

```ts
import * as kzg from 'c-kzg'
import { toBlobs, stringToHex } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) // [!code focus]

const signature = await account.signTransaction({
  blobs: toBlobs({ data: stringToHex('blobby blob!') }), // [!code focus]
  kzg, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts twoslash
import { parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  chainId: 1,
  maxFeePerGas: parseGwei('20'), // [!code focus]
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts twoslash
import { parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  chainId: 1,
  maxPriorityFeePerGas: parseGwei('3'), // [!code focus]
})
```

### nonce (可选)

- **类型:** `number`

唯一编号，用于标识此交易。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  nonce: 69 // [!code focus]
})
```

### to (可选)

- **类型:** `Address`

交易接收者。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  to: '0x...' // [!code focus]
})
```

### type (可选)

- **类型:** `"legacy" | "eip2930" | "eip1559"`

交易类型。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  type: 'eip1559' // [!code focus]
})
```

### value (可选)

- **类型:** `bigint`

与此交易一起发送的 wei 值。

```ts twoslash
import { parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signTransaction({
  value: parseEther('1'), // [!code focus]
})
```