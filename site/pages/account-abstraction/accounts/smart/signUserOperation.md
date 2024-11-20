# signUserOperation (智能账户)

使用智能账户的 **Owner** 签署用户操作。

## 用法

:::code-group

```ts twoslash [example.ts]
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})

const signature = await account.signUserOperation({ // [!code focus:99]
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const owner = privateKeyToAccount('0x...')
```

:::

## 返回值

`Hex`

用户操作签名。

## 参数

### callData

- **类型:** `Hex`

在主执行调用期间传递给 `sender` 的数据。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef', // [!code focus]
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### callGasLimit

- **类型:** `bigint`

分配给主执行调用的 gas 量。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n, // [!code focus]
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### factory

- **类型:** `Address`

账户工厂。仅适用于新账户。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e', // [!code focus]
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### factoryData

- **类型:** `Hex`

账户工厂的数据。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000', // [!code focus]
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### maxFeePerGas

- **类型:** `bigint`

每单位 gas 的最大费用。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n, // [!code focus]
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### maxPriorityFeePerGas

- **类型:** `bigint`

每单位 gas 的最大优先费用。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  // [!code focus]
  nonce: 0n,
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### nonce

- **类型:** `bigint`

防重放参数。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n, // [!code focus]
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### paymaster

- **类型:** `地址`

paymaster 合约的地址。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f', // [!code focus]
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### paymasterData

- **类型:** `十六进制`

paymaster 的数据。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  paymasterData: '0xdeadbeef', // [!code focus]
  paymasterPostOpGasLimit: 0n,
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### paymasterPostOpGasLimit

- **类型:** `大整数`

为 paymaster 后操作代码分配的 gas 数量。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n, // [!code focus]
  paymasterVerificationGasLimit: 0n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### paymasterVerificationGasLimit

- **类型:** `大整数`

为 paymaster 验证代码分配的 gas 数量。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n,
  paymasterVerificationGasLimit: 69420n, // [!code focus]
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### preVerificationGas

- **类型:** `大整数`

额外的 gas 用于支付 Bundler。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n,
  paymasterVerificationGasLimit: 69420n,
  preVerificationGas: 53438n, // [!code focus]
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n,
})
```

### sender

- **类型:** `地址`

进行操作的账户。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n,
  paymasterVerificationGasLimit: 69420n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f', // [!code focus]
  verificationGasLimit: 259350n,
})
```

### verificationGasLimit

- **类型:** `大整数`

为验证步骤分配的 gas 数量。

```ts twoslash
import { toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config'

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [owner],
})
// ---cut---
const signature = await account.signUserOperation({
  callData: '0xdeadbeef',
  callGasLimit: 141653n,
  factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
  factoryData: '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  paymaster: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n,
  paymasterVerificationGasLimit: 69420n,
  preVerificationGas: 53438n,
  sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
  verificationGasLimit: 259350n, // [!code focus]
})
```