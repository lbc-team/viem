---
description: 将用户操作广播到 Bundler。
---

# sendUserOperation

将用户操作广播到 Bundler。

## 用法

:::code-group

```ts twoslash [example.ts]
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const hash = await bundlerClient.sendUserOperation({ // [!code focus:7]
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')],
})

export const bundlerClient = createBundlerClient({
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

:::

:::info
上面的 Bundler URL 是一个公共端点。请不要在生产环境中使用，因为你可能会受到速率限制。考虑使用 [Pimlico's Bundler](https://www.pimlico.io)、[Biconomy's Bundler](https://www.biconomy.io) 或其他 Bundler 服务。
:::

### 账户提升

如果你不希望在每个 `sendUserOperation` 中传递 `account`，你还可以在 Bundler 客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts twoslash [example.ts]
import { parseEther } from 'viem'
import { bundlerClient } from './config'

const hash = await bundlerClient.sendUserOperation({ // [!code focus:7]
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')],
})

export const bundlerClient = createBundlerClient({
  account, // [!code ++]
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

:::

### 合约调用

`calls` 属性还接受 **合约调用**，可以通过 `abi`、`functionName` 和 `args` 属性使用。

:::code-group

```ts twoslash [example.ts]
import { parseEther } from 'viem'
import { bundlerClient, publicClient } from './config'
import { wagmiAbi } from './abi' // [!code focus]

const hash = await bundlerClient.sendUserOperation({ // [!code focus:7]
  calls: [{
    abi: wagmiAbi,
    functionName: 'mint',
    to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  }],
})
```

```ts twoslash [abi.ts] filename="abi.ts"
export const wagmiAbi = [
  // ...
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // ...
] as const;
```

```ts twoslash [config.ts]
import { createPublicClient, http } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')],
})

export const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

:::

## 返回

`Hash`

用户操作的哈希。

## 参数

### account

- **类型:** `SmartAccount`

用于用户操作执行的账户。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account, // [!code focus]
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})
```

### calls

- **类型:** `({ data?: Hex | undefined, to: Address, value?: bigint | undefined } | { abi: Abi, functionName: string, args: unknown[], to: Address, value?: bigint | undefined })[]`

要在用户操作中执行的调用。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{ // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
    value: parseEther('1') // [!code focus]
  }, { // [!code focus]
    abi: wagmiAbi, // [!code focus]
    functionName: 'mint', // [!code focus]
    to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  }] // [!code focus]
})
```

:::tip
你还可以通过 `callData` 属性传递原始调用数据：

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  callData: '0xdeadbeef', // [!code focus]
})
```
:::

### callGasLimit (可选)

- **类型:** `bigint`

分配给主执行调用的 gas 数量。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  callGasLimit: 69420n, // [!code focus]
})
```

### factory (可选)

- **类型:** `Address`

账户工厂地址。 

:::warning
此属性仅在智能账户尚未部署时填充。
:::

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  factory: '0x1234567890123456789012345678901234567890', // [!code focus]
  factoryData: '0xdeadbeef',
})
```

### factoryData (可选)

- **类型:** `Hex`

在账户工厂上执行以部署智能账户的调用数据。

:::warning
此属性仅在智能账户尚未部署时填充。
:::

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  factory: '0x1234567890123456789012345678901234567890',
  factoryData: '0xdeadbeef', // [!code focus]
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

用户操作执行的每个 gas 的最大费用。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  maxFeePerGas: 420n, // [!code focus]
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

用户操作执行的每个 gas 的最大优先费用。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  maxPriorityFeePerGas: 420n, 
  maxFeePerGas: 10n, // [!code focus]
})
```

### nonce (可选)

- **类型:** `bigint`

用户操作的 nonce。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  nonce: 10n, // [!code focus]
})
```

### paymaster (可选)

- **类型:** `Address | true | PaymasterClient | PaymasterActions`

为用户操作设置 Paymaster 配置。

- 如果 `paymaster: Address`，将使用提供的 Paymaster 合约地址进行赞助。
- 如果 `paymaster: PaymasterClient`，将使用提供的 [Paymaster Client](/account-abstraction/clients/paymaster) 进行赞助。
- 如果 `paymaster: true`，将假定 Bundler Client 也支持 Paymaster RPC 方法（例如 `pm_getPaymasterData`），并使用它们进行赞助。
- 如果提供了 [自定义函数](/account-abstraction/clients/bundler#paymastergetpaymasterdata-optional) 给 `paymaster`，将使用它们进行赞助。

#### 使用 Paymaster 合约地址

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB', // [!code focus]
  paymasterData: '0xdeadbeef',
})
```

#### 使用 Paymaster Client

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const paymasterClient = createPaymasterClient({ // [!code focus]
  transport: http('https://api.pimlico.io/v2/1/rpc?apikey={API_KEY}') // [!code focus]
}) // [!code focus]

const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: paymasterClient, // [!code focus]
})
```

#### 使用 Bundler Client 作为 Paymaster

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: true, // [!code focus]
})
```

### paymasterContext (可选)

- **类型:** `unknown`

Paymaster 特定字段。

:::warning
此属性仅在 **`paymaster` 是 Paymaster Client** 时可用。
:::

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const paymasterClient = createPaymasterClient({
  transport: http('https://api.pimlico.io/v2/1/rpc?apikey={API_KEY}')
})

const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: paymasterClient,
  paymasterContext: { // [!code focus]
    policyId: 'abc123' // [!code focus]
  }, // [!code focus]
})
```

### paymasterData (可选)

- **类型:** `Address`

在 Paymaster 合约上执行的调用数据。

:::warning
此属性仅在 **`paymaster` 是地址** 时可用。
:::

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef', // [!code focus]
})
```

### paymasterPostOpGasLimit (可选)

- **类型:** `bigint`

为 Paymaster 后操作代码分配的 gas 量。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n, // [!code focus]
})
```

### paymasterVerificationGasLimit (可选)

- **类型:** `bigint`

为 Paymaster 验证代码分配的 gas 量。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef',
  paymasterVerificationGasLimit: 69420n, // [!code focus]
})
```

### preVerificationGas (可选)

- **类型:** `bigint`

额外的 gas 用于支付给 Bundler。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  preVerificationGas: 69420n, // [!code focus]
})
```

### signature (可选)

- **类型:** `Hex`

用户操作的签名。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  signature: '0x...', // [!code focus]
})
```

### verificationGasLimit (可选)

- **类型:** `bigint`

为验证步骤分配的 gas 量。

```ts twoslash
import { account, bundlerClient } from './config'
import { parseEther } from 'viem'
// ---cut---
const hash = await bundlerClient.sendUserOperation({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  verificationGasLimit: 69420n, // [!code focus]
})
```