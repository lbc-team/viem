# Bundler Client [创建 Bundler Client 的函数]

Bundler Client 是与 **ERC-4337 Bundlers** 交互的接口，并提供通过 **Bundler Actions** 发送和检索 **User Operations** 的能力。

## 导入

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
```

## 用法

```ts twoslash
import { createPublicClient, http } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction' // [!code focus]
import { mainnet } from 'viem/chains' // [!code focus]

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

const bundlerClient = createBundlerClient({ // [!code focus]
  client, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc') // [!code focus]
}) // [!code focus]
```

:::info
上面的 Bundler URL 是一个公共端点。请不要在生产环境中使用，因为你可能会受到速率限制。考虑使用 [Pimlico's Bundler](https://www.pimlico.io)、[Biconomy's Bundler](https://www.biconomy.io) 或其他 Bundler 服务。
:::

## 参数

### account (可选)

- **类型:** `SmartAccount`

用于 Bundler Client 的 [Smart Account](/account-abstraction/accounts/smart)。这将用于需要 `account` 作为参数的 Actions。

```ts twoslash
import { createPublicClient, http } from 'viem' 
import { createBundlerClient } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains' 

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
// ---cut---
import { toCoinbaseSmartAccount } from 'viem/account-abstraction' // [!code focus]
import { privateKeyToAccount } from 'viem/accounts'

const owner = privateKeyToAccount('0x...')

const account = await toCoinbaseSmartAccount({ // [!code focus]
  client, // [!code focus]
  owners: [owner] // [!code focus]
}) // [!code focus]

const bundlerClient = createBundlerClient({
  account, // [!code focus]
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

### chain (可选)

- **类型:** [Chain](/docs/glossary/types#chain)

Bundler Client 的 [Chain](/docs/chains/introduction)。

```ts twoslash
import { createPublicClient, http } from 'viem' 
import { createBundlerClient } from 'viem/account-abstraction'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
// ---cut---
import { mainnet } from 'viem/chains' 

const bundlerClient = createBundlerClient({
  chain: mainnet, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

### client (可选)

- **类型:** `Client`

Bundler Client 的 [Client](/docs/clients/public)（指向执行 RPC）。

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
// ---cut---
import { createPublicClient, http } from 'viem' 
import { mainnet } from 'viem/chains'

const client = createPublicClient({ // [!code focus]
  chain: mainnet, // [!code focus]
  transport: http() // [!code focus]
}) // [!code focus]

const bundlerClient = createBundlerClient({
  client, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

### key (可选)

- **类型:** `string`
- **默认值:** `"bundler"`

Client 的一个键。

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
// ---cut---
const client = createBundlerClient({
  key: 'foo', // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

### name (可选)

- **类型:** `string`
- **默认值:** `"Bundler Client"`

Client 的一个名称。

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
// ---cut---
const client = createBundlerClient({
  name: 'Foo Bundler Client', // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

### paymaster (可选)

- **类型:** `true | PaymasterClient | { getPaymasterData: typeof getPaymasterData, getPaymasterStubData: typeof getPaymasterStubData }`

为 Bundler Client 设置 Paymaster 配置，以便在 User Operations 中使用。

- 如果 `paymaster: PaymasterClient`，则将使用提供的 [Paymaster Client](/account-abstraction/clients/paymaster) 进行 User Operation 赞助。
- 如果 `paymaster: true`，则假定 Bundler Client 也支持 Paymaster RPC 方法（例如 `pm_getPaymasterData`），并使用它们进行 User Operation 赞助。
- 如果提供了 [自定义函数](#paymastergetpaymasterdata-optional) 给 `paymaster`，则将使用它们进行 User Operation 赞助。

#### 使用 Paymaster Client

```ts twoslash
// @noErrors
import { createPaymasterClient, createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { client } from './config'
// ---cut---
const paymasterClient = createPaymasterClient({ // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc') // [!code focus]
}) // [!code focus]

const bundlerClient = createBundlerClient({
  chain: mainnet,
  paymaster: paymasterClient, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

#### 将 Bundler Client 作为 Paymaster 使用

```ts twoslash
// @noErrors
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const bundlerClient = createBundlerClient({
  chain: mainnet,
  paymaster: true, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

#### 使用自定义 Paymaster 函数

有关如何使用自定义 Paymaster 函数的更多信息，请参见下面的 [属性](#paymastergetpaymasterdata-optional)。

### paymaster.getPaymasterData (可选)

- **类型:** `(userOperation: UserOperation) => Promise<GetPaymasterDataReturnType>`

检索与 Paymaster 相关的 User Operation 属性，以便用于发送 User Operation。

[阅读更多](https://github.com/ethereum/ERCs/blob/master/ERCS/erc-7677.md#pm_getpaymasterdata)

```ts twoslash
// @noErrors
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const bundlerClient = createBundlerClient({
  chain: mainnet,
  paymaster: { // [!code focus]
    async getPaymasterData(userOperation) { // [!code focus]
      // 检索 User Operation 的 Paymaster 属性。 // [!code focus]
      return { // [!code focus]
        paymaster: '0x...', // [!code focus]
        paymasterData: '0x...', // [!code focus]
        paymasterVerificationGasLimit: 69420n, // [!code focus]
        paymasterPostOpGasLimit: 69420n, // [!code focus]
      } // [!code focus]
    } // [!code focus]
  } // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

### paymaster.getPaymasterStubData (可选)

- **类型:** `(userOperation: UserOperation) => Promise<GetPaymasterStubDataReturnType>`

检索与 Paymaster 相关的 User Operation 属性，以便用于 gas 估算。

[阅读更多](https://github.com/ethereum/ERCs/blob/master/ERCS/erc-7677.md#pm_getpaymasterstubdata)

```ts twoslash
// @noErrors
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const bundlerClient = createBundlerClient({
  chain: mainnet,
  paymaster: { 
    async getPaymasterStubData(userOperation) { // [!code focus]
      // 检索 User Operation 的 Paymaster 属性。 // [!code focus]
      return { // [!code focus]
        paymaster: '0x...', // [!code focus]
        paymasterData: '0x...', // [!code focus]
        paymasterVerificationGasLimit: 69420n, // [!code focus]
        paymasterPostOpGasLimit: 69420n, // [!code focus]
      } // [!code focus]
    } // [!code focus]
    async getPaymasterData(userOperation) { /* ... */ }
  } 
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

### paymasterContext (可选)

- **类型:** `unknown`

Paymaster 特定字段。

```ts twoslash
// @noErrors
import { createPaymasterClient, createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { client } from './config'
// ---cut---
const paymasterClient = createPaymasterClient({
  transport: http('https://public.pimlico.io/v2/1/rpc')
})

const bundlerClient = createBundlerClient({
  chain: mainnet,
  paymaster: paymasterClient,
  paymasterContext: { // [!code focus]
    policyId: 'abc123' // [!code focus]
  }, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

### pollingInterval (可选)

- **类型:** `number`
- **默认值:** `4_000`

轮询启用的操作的频率（以毫秒为单位）。

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
// ---cut---
const client = createBundlerClient({
  pollingInterval: 10_000, // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc')
})
```

### rpcSchema (可选)

- **类型:** `RpcSchema`
- **默认值:** `BundlerRpcSchema`

客户端的类型化 JSON-RPC 架构。

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
// @noErrors
// ---cut---
import { rpcSchema } from 'viem'

type CustomRpcSchema = [{ // [!code focus]
  Method: 'eth_wagmi', // [!code focus]
  Parameters: [string] // [!code focus]
  ReturnType: string // [!code focus]
}] // [!code focus]

const client = createBundlerClient({
  rpcSchema: rpcSchema<CustomRpcSchema>(), // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc')
})

const result = await client.request({ // [!code focus]
  method: 'eth_wa // [!code focus] 
//               ^|

  params: ['hello'], // [!code focus]
}) // [!code focus]
```

### transport

- **类型:** `Transport`

Bundler 客户端的传输。

```ts twoslash
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const bundlerClient = createBundlerClient({
  chain: mainnet,
  transport: http('https://public.pimlico.io/v2/1/rpc'), // [!code focus]
})
```

### userOperation (可选)

用户操作的配置。

#### userOperation.estimateFeesPerGas

- **类型:** `({ account: Account, bundlerClient: Client, userOperation: UserOperationRequest }) => Promise<{ maxFeePerGas: bigint, maxPriorityFeePerGas: bigint }>`

为用户操作请求准备费用属性。

```ts twoslash
// @noErrors
import { createBundlerClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const bundlerClient = createBundlerClient({
  chain: mainnet,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
  userOperation: { // [!code focus]
    async estimateFeesPerGas({ account, bundlerClient, userOperation }) { // [!code focus]
      // 估算用户操作的每单位 gas 费用。 // [!code focus]
      return { // [!code focus]
        maxFeePerGas: /* ... */, // [!code focus]
        maxPriorityFeePerGas: /* ... */, // [!code focus]
      } // [!code focus]
    } // [!code focus]
  } // [!code focus]
})
```