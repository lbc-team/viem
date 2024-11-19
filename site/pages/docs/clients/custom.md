# 构建你自己的客户端

你可以通过使用 `createClient` 函数并可选地扩展（`.extend`）它来构建自己的 viem 客户端——这就是 viem 的内部客户端（ [公共](/docs/clients/public) 、[钱包](/docs/clients/wallet) 和 [测试](/docs/clients/test)）的构建方式。

构建你自己的客户端在你对客户端的行为有特定要求时非常有用，并且如果你想用自定义功能扩展该客户端（即创建一个 [geth Debug](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-debug) 客户端）。

`createClient` 函数设置一个基础的 viem 客户端，配置了给定的 [Transport](/docs/clients/intro) 和 [Chain](/docs/chains/introduction)。之后，你可以用自定义属性（可以是 Actions 或其他配置）扩展客户端。

## 导入

```ts twoslash
import { createClient } from 'viem'
```

## 用法

使用你所需的 [Chain](/docs/chains/introduction)（例如 `mainnet`）和 [Transport](/docs/clients/intro)（例如 `http`）初始化客户端。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createClient({ 
  chain: mainnet,
  transport: http()
})
```

接下来，你可以选择 [用 Actions 或配置扩展你的客户端](#extending-with-actions-or-configuration)，或者你可以直接使用它以实现 [最大化应用中的树摇](#tree-shaking)。

### 用 Actions 或配置扩展

你可以通过使用 `.extend` 函数用自定义 Actions 或配置扩展你的客户端。

下面是实现一个 [geth Debug](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-debug) 客户端的简单实现，带有一个使用 `debug_traceCall` RPC 方法的 `traceCall` Action。

```ts twoslash {12-21,23-29}
// @noErrors
import { 
  createClient, 
  http,
  formatTransactionRequest,
  type CallParameters
} from 'viem'
import { mainnet } from 'viem/chains'

const debugClient = createClient({ 
  chain: mainnet,
  transport: http(),
}).extend(client => ({
  // ...
  async traceCall(args: CallParameters) {
    return client.request({
      method: 'debug_traceCall',
      params: [formatTransactionRequest(args), 'latest', {}]
    })
  },
  // ...
}))

const response = await debugClient.traceCall({
  account: '0xdeadbeef29292929192939494959594933929292',
  to: '0xde929f939d939d393f939393f93939f393929023',
  gas: 69420n,
  data: '0xf00d4b5d00000000000000000000000001291230982139282304923482304912923823920000000000000000000000001293123098123928310239129839291010293810'
})
// { failed: false, gas: 69420, returnValue: '...', structLogs: [] }
```

有关使用 `.extend` 的更简洁实现，请查看 viem 的 [公共客户端实现](https://github.com/wagmi-dev/viem/blob/29c053f5069a5b44e3791972c221368a2c71a254/src/clients/createPublicClient.ts#L48-L68)，它扩展了 [公共 Actions](https://github.com/wagmi-dev/viem/blob/29c053f5069a5b44e3791972c221368a2c71a254/src/clients/decorators/public.ts#L1377-L1425)。

### 树摇

你可以直接使用客户端，而不带装饰的 Actions，以最大化应用中的树摇。这在你对包大小非常讲究并且只想包含你使用的 Actions 时非常有用。

在下面的示例中，我们不是从公共客户端调用 `getBlock`，而是直接从 `viem` 导入该 Action，然后将我们的客户端作为第一个参数注入到该 Action 中。

```ts twoslash {3,10-11}
// @noErrors
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { getBlock, sendTransaction } from 'viem/actions'

const client = createClient({ 
  chain: mainnet,
  transport: http()
})

const blockNumber = await getBlock(client, { blockTag: 'latest' })
const hash = await sendTransaction(client, { ... })
```

## 参数

### transport

- **类型：** [Transport](/docs/glossary/types#transport)

公共客户端的 [Transport](/docs/clients/intro)。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  chain: mainnet,
  transport: http(), // [!code focus]
})
```

### account（可选）

- **类型：** `Account | Address`

用于客户端的账户。这将用于需要 `account` 作为参数的 Actions。

接受 [JSON-RPC 账户](/docs/accounts/jsonRpc) 或 [本地账户（私钥等）](/docs/accounts/local/privateKeyToAccount)。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
import { privateKeyToAccount } from 'viem/accounts'

const client = createClient({
  account: privateKeyToAccount('0x...'), // [!code focus]
  chain: mainnet,
  transport: http(),
})
```

### chain（可选）

- **类型：** [Chain](/docs/glossary/types#chain)

公共客户端的 [Chain](/docs/chains/introduction)。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  chain: mainnet, // [!code focus]
  transport: http(),
})
```

### batch（可选）

批处理设置的标志。

### batch.multicall（可选）

- **类型：** `boolean | MulticallBatchOptions`
- **默认值：** `false`

切换以启用 `eth_call` 多重调用聚合。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  batch: {
    multicall: true, // [!code focus]
  },
  chain: mainnet,
  transport: http(),
})
```

### batch.multicall.batchSize（可选）

- **类型：** `number`
- **默认值：** `1_024`

每个多重调用（`aggregate3`）的最大大小（以字节为单位）。

> 注意：某些 RPC 提供者限制可以在单个请求中发送的 calldata 数量。最好与你的 RPC 提供者确认是否对 `eth_call` 请求的 calldata 大小有限制。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  batch: {
    multicall: {
      batchSize: 512, // [!code focus]
    },
  },
  chain: mainnet,
  transport: http(),
})
```

### batch.multicall.wait（可选）

- **类型：** `number`
- **默认值：** `0`（ [零延迟](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays) ）

发送批处理之前等待的最大毫秒数。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  batch: {
    multicall: {
      wait: 16, // [!code focus]
    },
  },
  chain: mainnet,
  transport: http(),
})
```

### key（可选）

- **类型：** `string`
- **默认值：** `"public"`

客户端的密钥。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  chain: mainnet,
  key: 'public', // [!code focus]
  transport: http(),
})
```

### name（可选）

- **类型：** `string`
- **默认值：** `"Public Client"`

客户端的名称。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  chain: mainnet,
  name: 'Public Client', // [!code focus]
  transport: http(),
})
```

### pollingInterval（可选）

- **类型：** `number`
- **默认值：** `4_000`

启用轮询的操作的频率（以毫秒为单位）。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createClient({
  chain: mainnet,
  pollingInterval: 10_000, // [!code focus]
  transport: http(),
})
```

### rpcSchema（可选）

- **类型：** `RpcSchema`
- **默认值：** `WalletRpcSchema`

客户端的类型化 JSON-RPC 架构。

```ts twoslash
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// @noErrors
// ---cut---
import { rpcSchema } from 'viem'

type CustomRpcSchema = [{ // [!code focus]
  Method: 'eth_wagmi', // [!code focus]
  Parameters: [string] // [!code focus]
  ReturnType: string // [!code focus]
}] // [!code focus]

const client = createClient({
  chain: mainnet,
  rpcSchema: rpcSchema<CustomRpcSchema>(), // [!code focus]
  transport: http()
})

const result = await client.request({ // [!code focus]
  method: 'eth_wa // [!code focus] 
//               ^|
  params: ['hello'], // [!code focus]
}) // [!code focus]
```