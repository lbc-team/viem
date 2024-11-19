# 公共客户端 [创建公共客户端的函数]

公共客户端是一个接口，用于访问“公共” [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/) 方法，例如检索区块号、交易、从智能合约读取数据等，通过 [公共操作](/docs/actions/public/introduction)。

`createPublicClient` 函数使用给定的 [Transport](/docs/clients/intro) 配置为 [Chain](/docs/chains/introduction) 设置公共客户端。

## 导入

```ts twoslash
import { createPublicClient } from 'viem'
```

## 用法

使用你所需的 [Chain](/docs/chains/introduction)（例如 `mainnet`）和 [Transport](/docs/clients/intro)（例如 `http`）初始化客户端。

```ts twoslash
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const publicClient = createPublicClient({ 
  chain: mainnet,
  transport: http()
})
```

然后你可以使用 [公共操作](/docs/actions/public/introduction)：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const blockNumber = await publicClient.getBlockNumber() // [!code focus:10]
```

## 优化

公共客户端还支持 [`eth_call` 聚合](#multicall) 以提高性能。

### `eth_call` 聚合（通过 Multicall）

公共客户端支持将 `eth_call` 请求聚合为单个 multicall (`aggregate3`) 请求。

这意味着对于每个使用 `eth_call` 请求的操作（即 `readContract`），公共客户端将在一段时间内批量请求，并将其作为单个 multicall 请求发送到 RPC 提供者。这可以显著提高网络性能，并减少 RPC 提供者（如 Alchemy、Infura 等）使用的 [计算单位 (CU)](https://docs.alchemy.com/reference/compute-units)。

公共客户端在给定的时间段内调度 `eth_call` 请求的聚合。默认情况下，它在当前 [JavaScript 消息队列](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#queue) 结束时执行批量请求（ [零延迟](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays) ），但是，消费者可以指定自定义的 `wait` 时间（以毫秒为单位）。

你可以通过将 `batch.multicall` 标志设置为 `true` 来启用 `eth_call` 聚合：

```ts twoslash
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const publicClient = createPublicClient({
  batch: {
    multicall: true, // [!code focus]
  },
  chain: mainnet,
  transport: http(),
})
```

> 你还可以 [自定义 `multicall` 选项](#batchmulticallbatchsize-optional)。

现在，当你开始使用 `readContract` 操作时，公共客户端将在消息队列结束时（或自定义时间段）批量发送这些请求，作为单个 `eth_call` multicall 请求：

:::code-group

```ts twoslash [example.ts]
// @filename: client.ts
// [!include ~/snippets/publicClient.ts]

// @filename: abi.ts
// [!include ~/snippets/erc20Abi.ts]

// @filename: example.ts
const address = '0x'
// ---cut---
import { getContract } from 'viem'
import { abi } from './abi'
import { publicClient } from './client'

const contract = getContract({ address, abi, client: publicClient })

// 以下将向 RPC 提供者发送单个请求。
const [name, totalSupply, symbol, balance] = await Promise.all([
  contract.read.name(),
  contract.read.totalSupply(),
  contract.read.symbol(),
  contract.read.balanceOf([address]),
])
```

```ts twoslash [client.ts]
// [!include ~/snippets/publicClient.ts]
```

```ts twoslash [abi.ts]
// [!include ~/snippets/erc20Abi.ts]
```

:::

> 了解更多关于 [合约实例](/docs/contract/getContract)。

## 参数

### transport

- **类型：** [Transport](/docs/glossary/types#transport)

公共客户端的 [Transport](/docs/clients/intro)。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(), // [!code focus]
})
```

### chain（可选）

- **类型：** [Chain](/docs/glossary/types#chain)

公共客户端的 [Chain](/docs/chains/introduction)。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  chain: mainnet, // [!code focus]
  transport: http(),
})
```

### batch（可选）

批量设置的标志。

### batch.multicall（可选）

- **类型：** `boolean | MulticallBatchOptions`
- **默认值：** `false`

切换以启用 `eth_call` multicall 聚合。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
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

每个 multicall (`aggregate3`) calldata 块的最大大小（以字节为单位）。

> 注意：某些 RPC 提供者限制可以在单个请求中发送的 calldata 数量。最好与你的 RPC 提供者确认是否存在 `eth_call` 请求的 calldata 大小限制。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
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
- **默认值：** `0` （ [零延迟](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop#zero_delays) ）

发送批量请求之前的最大等待毫秒数。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  batch: {
    multicall: {
      wait: 16, // [!code focus]
    },
  },
  chain: mainnet,
  transport: http(),
})
```

### cacheTime（可选）

- **类型：** `number`
- **默认值：** `client.pollingInterval`

缓存数据在内存中保留的时间（以毫秒为单位）。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  cacheTime: 10_000, // [!code focus]
  chain: mainnet,
  transport: http(),
})
```

### ccipRead（可选）

- **类型：** `(parameters: CcipRequestParameters) => Promise<CcipRequestReturnType> | false`
- **默认值：** `true`

[CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) 配置。

CCIP Read 默认启用，但如果设置为 `false`，客户端将不支持离线 CCIP 查找。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  ccipRead: false, // [!code focus]
  chain: mainnet,
  transport: http(),
})
```

### ccipRead.request（可选）

- **类型：** `(parameters: CcipRequestParameters) => Promise<CcipRequestReturnType>`

一个函数，将被调用以进行 [离线 CCIP 查找请求](https://eips.ethereum.org/EIPS/eip-3668#client-lookup-protocol)。

```ts twoslash
// @noErrors
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  ccipRead: { // [!code focus]
    async request({ data, sender, urls }) { // [!code focus]
      // ... // [!code focus]
    } // [!code focus]
  }, // [!code focus]
  chain: mainnet,
  transport: http(),
})
```

### key (可选)

- **类型:** `string`
- **默认值:** `"public"`

客户端的密钥。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  chain: mainnet,
  key: 'public', // [!code focus]
  transport: http(),
})
```

### name (可选)

- **类型:** `string`
- **默认值:** `"Public Client"`

客户端的名称。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  chain: mainnet,
  name: 'Public Client', // [!code focus]
  transport: http(),
})
```

### pollingInterval (可选)

- **类型:** `number`
- **默认值:** `4_000`

轮询启用的操作的频率（以毫秒为单位）。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// ---cut---
const publicClient = createPublicClient({
  chain: mainnet,
  pollingInterval: 10_000, // [!code focus]
  transport: http(),
})
```

### rpcSchema (可选)

- **类型:** `RpcSchema`
- **默认值:** `PublicRpcSchema`

客户端的类型化 JSON-RPC 架构。

```ts twoslash
// [!include ~/snippets/publicClient.ts:imports]
// @noErrors
// ---cut---
import { rpcSchema } from 'viem'

type CustomRpcSchema = [{ // [!code focus]
  Method: 'eth_wagmi', // [!code focus]
  Parameters: [string] // [!code focus]
  ReturnType: string // [!code focus]
}] // [!code focus]

const publicClient = createPublicClient({
  chain: mainnet,
  rpcSchema: rpcSchema<CustomRpcSchema>(), // [!code focus]
  transport: http(),
})

const result = await publicClient.request({ // [!code focus]
  method: 'eth_wa // [!code focus] 
//               ^|
  params: ['hello'], // [!code focus]
}) // [!code focus]
```

## 实时示例

查看下面的实时 [公共客户端示例](https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/clients_public-client) 中 `createPublicClient` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/clients_public-client?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>