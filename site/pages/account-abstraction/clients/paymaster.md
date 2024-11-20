# Paymaster Client [创建 Paymaster Client 的函数]

Paymaster Client 是与 ** [符合 ERC-7677 的 Paymasters](https://eips.ethereum.org/EIPS/eip-7677)** 交互的接口，并提供赞助 **用户操作** gas 费用的能力。

:::note
了解更多关于 **ERC-7677 Paymasters** 的信息：
- [网站](https://erc7677.xyz/)
- [规范](https://eips.ethereum.org/EIPS/eip-7677)
:::

## 导入

```ts twoslash
import { createPaymasterClient } from 'viem/account-abstraction'
```

## 用法

```ts twoslash
import { http } from 'viem'
import { 
  createBundlerClient, 
  createPaymasterClient,
} from 'viem/account-abstraction'
import { sepolia } from 'viem/chains'

const paymasterClient = createPaymasterClient({ // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc'), // [!code focus]
}) // [!code focus]

const bundlerClient = createBundlerClient({
  chain: sepolia,
  paymaster: paymasterClient, // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc'),
})
```

:::info
上面的 Paymaster URL 是一个公共端点 **仅用于测试网**。请勿在生产环境中使用，因为你可能会受到速率限制。考虑使用 [Pimlico 的 Paymaster](https://www.pimlico.io) 或其他 Paymaster 服务。
:::

:::tip
你可以在 [发送用户操作指南](/account-abstraction/guides/sending-user-operations#7-optional-sponsor-user-operation) 中查看端到端 Paymaster Client 使用的示例。
:::

## 参数

### key（可选）

- **类型：** `string`
- **默认：** `"paymaster"`

Client 的键。

```ts twoslash
import { createPaymasterClient } from 'viem/account-abstraction'
import { http } from 'viem'
// ---cut---
const client = createPaymasterClient({
  key: 'foo', // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc')
})
```

### name（可选）

- **类型：** `string`
- **默认：** `"Paymaster Client"`

Client 的名称。

```ts twoslash
import { createPaymasterClient } from 'viem/account-abstraction'
import { http } from 'viem'
// ---cut---
const client = createPaymasterClient({
  name: 'Foo Bundler Client', // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc')
})
```

### pollingInterval（可选）

- **类型：** `number`
- **默认：** `4_000`

启用操作的轮询频率（以毫秒为单位）。

```ts twoslash
import { createPaymasterClient } from 'viem/account-abstraction'
import { http } from 'viem'
// ---cut---
const client = createPaymasterClient({
  pollingInterval: 10_000, // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc')
})
```

### rpcSchema（可选）

- **类型：** `RpcSchema`
- **默认：** `PaymasterRpcSchema`

Client 的类型化 JSON-RPC 架构。

```ts twoslash
import { createPaymasterClient } from 'viem/account-abstraction'
import { http } from 'viem'
// @noErrors
// ---cut---
import { rpcSchema } from 'viem'

type CustomRpcSchema = [{ // [!code focus]
  Method: 'eth_wagmi', // [!code focus]
  Parameters: [string] // [!code focus]
  ReturnType: string // [!code focus]
}] // [!code focus]

const client = createPaymasterClient({
  rpcSchema: rpcSchema<CustomRpcSchema>(), // [!code focus]
  transport: http('https://public.pimlico.io/v2/11155111/rpc')
})

const result = await client.request({ // [!code focus]
  method: 'eth_wa // [!code focus] 
//               ^|

  params: ['hello'], // [!code focus]
}) // [!code focus]
```

### transport

- **类型：** `Transport`

Paymaster Client 的传输方式。

```ts twoslash
import { createPaymasterClient } from 'viem/account-abstraction'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const paymasterClient = createPaymasterClient({
  transport: http('https://public.pimlico.io/v2/11155111/rpc'), // [!code focus]
})
```