---
description: 合约实例是一个类型安全的接口，用于使用特定的 ABI 和地址执行合约相关操作，由 `getContract` 函数创建。
---

# 合约实例

合约实例是一个类型安全的接口，用于使用特定的 ABI 和地址执行合约相关操作，由 `getContract` 函数创建。

## 导入

```ts
import { getContract } from 'viem'
```

## 用法

你可以通过传入 [ABI](/docs/glossary/types#abi)、地址和 [公共](/docs/clients/public) 和/或 [钱包客户端](/docs/clients/wallet) 来使用 `getContract` 函数创建合约实例。创建后，你可以调用合约方法、获取事件、监听事件等。

:::code-group

```ts [example.ts]
import { getContract } from 'viem'
import { wagmiAbi } from './abi'
import { publicClient, walletClient } from './client'

// 1. 创建合约实例
const contract = getContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  // 1a. 插入单个客户端
  client: publicClient,
  // 1b. 或公共和/或钱包客户端
  client: { public: publicClient, wallet: walletClient }
})

// 2. 调用合约方法，获取事件，监听事件等
const result = await contract.read.totalSupply()
const logs = await contract.getEvents.Transfer()
const unwatch = contract.watchEvent.Transfer(
  { from: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e' },
  { onLogs(logs) { console.log(logs) } }
)
```

```ts [client.ts]
import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { EthereumProvider } from '@walletconnect/ethereum-provider'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

// 例如：Metamask
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
})

// 例如：WalletConnect
const provider = await EthereumProvider.init({
  projectId: "abcd1234",
  showQrModal: true,
  chains: [1],
})

export const walletClientWC = createWalletClient({
  chain: mainnet,
  transport: custom(provider),
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: true,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
  ...
] as const;
```

:::

使用合约实例可以更轻松地与合约进行交互，如果你不想在每次执行合约操作时都传递 `abi` 和 `address` 属性，例如 [`readContract`](/docs/contract/readContract)、[`writeContract`](/docs/contract/writeContract)、[`estimateContractGas`](/docs/contract/estimateContractGas) 等。切换下面的选项卡以查看独立合约操作和合约实例操作之间的区别：

:::code-group

```ts [contract-instance.ts]
import { getContract } from 'viem'
import { wagmiAbi } from './abi'
import { publicClient, walletClient } from './client'

const contract = getContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  client: {
    public: publicClient,
    wallet: walletClient,
  }
})

const balance = await contract.read.balanceOf([
  '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
])
const hash = await contract.write.mint([69420])
const logs = await contract.getEvents.Transfer()
const unwatch = contract.watchEvent.Transfer(
  {
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
  { onLogs: logs => console.log(logs) }
)
```

```ts [contract-actions.ts]
import { wagmiAbi } from './abi'
import { publicClient, walletClient } from './client'

const balance = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
const unwatch = publicClient.watchContractEvent({
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
  abi: wagmiAbi,
  eventName: 'Transfer',
  args: {
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
  onLogs: logs => console.log(logs)
})
```

:::

:::tip
虽然合约实例非常适合减少代码重复，但它们会引入多个合约操作（例如 `createContractEventFilter`、`estimateContractGas`、`readContract`、`simulateContract`、`watchContractEvent`、`writeContract`），因此它们可能比单独的调用稍重。如果你只需要几个合约方法，并且希望尽可能减少包的大小，你可能想要使用单独的调用。
:::

## 返回值

合约实例对象。类型是推断的。

根据你是使用公共客户端、钱包客户端还是两者创建合约实例，合约实例上可用的方法将有所不同。

#### 使用公共客户端

如果你传入一个 [`publicClient`](https://viem.sh/docs/clients/public)，则可以使用以下方法：

- [`createEventFilter`](/docs/contract/createContractEventFilter)
- [`estimateGas`](/docs/contract/estimateContractGas)
- [`getEvents`](/docs/contract/getContractEvents)
- [`read`](/docs/contract/readContract)
- [`simulate`](/docs/contract/simulateContract)
- [`watchEvent`](/docs/contract/watchContractEvent)

#### 使用钱包客户端

如果你传入一个 [`walletClient`](/docs/clients/wallet)，则可以使用以下方法：

- [`estimateGas`](/docs/contract/estimateContractGas)
- [`write`](/docs/contract/writeContract)

#### 调用方法

如果你在 viem 中使用 [TypeScript](/docs/typescript)，你的编辑器将能够为合约实例上可用的方法、每个方法的参数和其他选项提供自动补全建议。

一般来说，合约实例方法遵循以下格式：

```ts
// 函数
contract.(estimateGas|read|simulate|write).(functionName)(args, options)

// 事件
contract.(createEventFilter|getEvents|watchEvent).(eventName)(args, options)
```

如果你使用的合约函数/事件不接受参数（例如函数没有输入，事件没有索引输入），则可以省略 `args` 参数，使 `options` 成为第一个也是唯一的参数。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const contract = getContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  client: publicClient
})
```

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const contract = getContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  client: publicClient
})
```

### client

- **类型:** [`Client | { public: Client; wallet: Client }`](/docs/clients/public)

用于执行 [合约操作](/docs/contract/getContract#return-value) 的客户端。

```ts
const contract = getContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  client: publicClient, // [!code focus]
})
```

你还可以传入多个客户端（即一个钱包客户端和一个公共客户端）：

```ts
const contract = getContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  client: { // [!code focus]
    public: publicClient, // [!code focus]
    wallet: walletClient // [!code focus]
  }, // [!code focus]
})
```