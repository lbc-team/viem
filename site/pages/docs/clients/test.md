# 测试客户端 [创建测试客户端的函数]

测试客户端是一个接口，用于“测试”通过本地以太坊测试节点（如 [Anvil](https://book.getfoundry.sh/anvil/) 或 [Hardhat](https://hardhat.org/)）访问的 JSON-RPC API 方法，例如挖矿区块、模拟账户、设置费用等，通过 [测试操作](/docs/actions/test/introduction)。

`createTestClient` 函数使用给定的 [Transport](/docs/clients/intro) 设置一个测试 RPC 客户端。

## 导入

```ts twoslash
import { createTestClient } from 'viem'
```

## 用法

使用你所需的 [Chain](/docs/chains/introduction)、[Transport](/docs/clients/intro)（例如 `http`）和 [mode](#mode)（例如 `"anvil"`）初始化客户端。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'

const client = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
```

然后你可以使用 [测试操作](/docs/actions/test/introduction)：

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'

const client = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
// ---cut---
const mine = await client.mine({ blocks: 1 }) // [!code focus:10]
```

### 扩展公共和钱包操作

在与以太坊测试节点交互时，你可能还希望与相同的 `chain` 和 `transport` 交互 [公共操作](/docs/actions/public/introduction) 和 [钱包操作](/docs/actions/wallet/introduction)。你可以通过扩展测试客户端来实现，而不是创建三个不同的客户端：

```ts twoslash
// @noErrors
import { createTestClient, http, publicActions, walletActions } from 'viem'
import { foundry } from 'viem/chains'

const client = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
  .extend(publicActions) // [!code hl]
  .extend(walletActions) // [!code hl]

const blockNumber = await client.getBlockNumber() // 公共操作
const hash = await client.sendTransaction({ ... }) // 钱包操作
const mine = await client.mine({ blocks: 1 }) // 测试操作
```

## 参数

### mode

- **类型：** `"anvil" | "hardhat" | "ganache"`

测试客户端的模式。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
const client = createTestClient({
  chain: foundry,
  mode: 'anvil', // [!code focus]
  transport: http(), 
})
```

### transport

- **类型：** [Transport](/docs/glossary/types#transport)

测试客户端的 [Transport](/docs/clients/intro)。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
const client = createTestClient({
  chain: foundry,
  mode: 'anvil', 
  transport: http(),  // [!code focus]
})
```

### account (可选)

- **类型：** `Account | Address`

用于客户端的账户。这将用于需要 `account` 作为参数的操作。

接受 [JSON-RPC 账户](/docs/accounts/jsonRpc) 或 [本地账户（私钥等）](/docs/accounts/local/privateKeyToAccount)。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
import { privateKeyToAccount } from 'viem/accounts'

const client = createTestClient({
  account: privateKeyToAccount('0x...'), // [!code focus]
  chain: foundry,
  mode: 'anvil',
  transport: http(),
})
```

### chain (可选)

- **类型：** [Chain](/docs/glossary/types#chain)

测试客户端的 [Chain](/docs/chains/introduction)。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
const client = createTestClient({
  chain: foundry, // [!code focus]
  mode: 'anvil',
  transport: http(), 
})
```

### cacheTime (可选)

- **类型：** `number`
- **默认值：** `client.pollingInterval`

缓存数据在内存中保留的时间（以毫秒为单位）。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
const client = createTestClient({
  cacheTime: 10_000, // [!code focus]
  chain: foundry,
  mode: 'anvil',
  transport: http(),
})
```

### name (可选)

- **类型：** `string`
- **默认值：** `"Test Client"`

客户端的名称。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
const client = createTestClient({
  chain: foundry,
  mode: 'anvil', 
  name: 'Anvil Client',  // [!code focus]
  transport: http(),
})
```

### pollingInterval (可选)

- **类型：** `number`
- **默认值：** `4_000`

启用操作的轮询频率（以毫秒为单位）。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// ---cut---
const client = createTestClient({
  chain: foundry,
  mode: 'anvil', 
  pollingInterval: 10_000,  // [!code focus]
  transport: http(),
})
```

### rpcSchema (可选)

- **类型：** `RpcSchema`
- **默认值：** `TestRpcSchema`

客户端的类型化 JSON-RPC 架构。

```ts twoslash
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'
// @noErrors
// ---cut---
import { rpcSchema } from 'viem'

type CustomRpcSchema = [{ // [!code focus]
  Method: 'eth_wagmi', // [!code focus]
  Parameters: [string] // [!code focus]
  ReturnType: string // [!code focus]
}] // [!code focus]

const client = createTestClient({
  chain: foundry,
  rpcSchema: rpcSchema<CustomRpcSchema>(), // [!code focus]
  transport: http()
})

const result = await client.request({ // [!code focus]
  method: 'eth_wa // [!code focus] 
//               ^|
  params: ['hello'], // [!code focus]
}) // [!code focus]
```