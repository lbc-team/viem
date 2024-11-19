---
description: 调用合约上的只读函数，并返回响应。
---

# readContract

调用合约上的只读函数，并返回响应。

在 Solidity 合约中，“只读”函数（常量函数）由 `view` 或 `pure` 关键字表示。它们只能读取合约的状态，不能对其进行任何更改。由于只读方法不会改变合约的状态，因此执行时不需要任何 gas，任何用户都可以调用而无需支付 gas。

在内部，`readContract` 使用 [Public Client](/docs/clients/public) 调用 [`call` action](/docs/actions/public/call) 并使用 [ABI 编码的 `data`](/docs/contract/encodeFunctionData)。

## 用法

下面是如何调用合约上的只读函数（没有参数）的一个非常基本的示例。

:::code-group

```ts [example.ts]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
})
// 69420n
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 传递参数

如果你的函数需要参数，可以通过 `args` 属性传递它们。

`args` 的 TypeScript 类型将根据函数名称和 ABI 推断，以防止你插入错误的值。

例如，下面的 `balanceOf` 函数名称需要一个 **地址** 参数，并且其类型为 `["0x${string}"]`。

:::code-group

```ts [example.ts] {8}
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC']
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 无需部署的读取

可以调用尚未部署的合约上的函数。例如，我们可能想调用尚未部署的 [ERC-4337 智能账户](https://eips.ethereum.org/EIPS/eip-4337) 合约上的函数。

Viem 提供两种方式来执行无部署调用，通过：

- [字节码](#bytecode)
- [部署工厂](#deploy-factory)：使用提供的 [部署工厂](https://docs.alchemy.com/docs/create2-an-alternative-to-deriving-contract-addresses#create2-contract-factory) “临时部署” 合约，并在已部署的合约上调用函数。

:::tip
**无部署调用**模式也可以通过 [合约实例](/docs/contract/getContract) API 访问。
:::

#### 字节码

下面的示例演示了如何利用无部署调用 **通过字节码** 调用尚未部署的 [Wagmi 示例 ERC721 合约](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2#code) 上的 `name` 函数：

:::code-group

```ts twoslash [example.ts]
import { parseAbi } from 'viem'
import { publicClient } from './config'

const data = await publicClient.readContract({
  abi: parseAbi(['function name() view returns (string)']),
  code: '0x...', // 可在此处访问: https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2#code
  functionName: 'name'
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

#### 部署工厂

下面的示例演示了如何利用无部署调用 **通过 [部署工厂](https://docs.alchemy.com/docs/create2-an-alternative-to-deriving-contract-addresses#create2-contract-factory)** 调用尚未部署的 [ERC-4337 智能账户](https://eips.ethereum.org/EIPS/eip-4337) 上的 `entryPoint` 函数：

:::code-group

```ts twoslash [example.ts]
import { encodeFunctionData, parseAbi } from 'viem'
import { account, publicClient } from './config'

const data = await publicClient.readContract({
  // 智能账户部署者（工厂）的地址。
  factory: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',

  // 在工厂上执行以部署智能账户的函数。
  factoryData: encodeFunctionData({
    abi: parseAbi(['function createAccount(address owner, uint256 salt)']),
    functionName: 'createAccount',
    args: [account, 0n],
  }),

  // 在智能账户上调用的函数。
  abi: account.abi,
  address: account.address,
  functionName: 'entryPoint',
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

export const account = {
  address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  abi: parseAbi(['function entryPoint() view returns (address)'])
} as const

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

:::note
此示例利用了 [SimpleAccountFactory](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccountFactory.sol)。
:::

## 返回值

来自合约的响应。类型是推断的。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'totalSupply',
})
```

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  functionName: 'totalSupply',
})
```

### functionName

- **类型:** `string`

要从 ABI 中提取的函数。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply', // [!code focus]
})
```

### args（可选）

- **类型:** 从 ABI 推断。

传递给函数调用的参数。

```ts
const data = await publicClient.readContract({
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'] // [!code focus]
})
```

### account（可选）

- **类型:** `Account | Address`

可选的账户发送者覆盖。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值:** `'latest'`

要执行读取的区块标签。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
  blockTag: 'safe', // [!code focus]
})
```

### factory (可选)

- **类型:**

合约部署工厂地址（即 Create2 工厂、智能账户工厂等）。

```ts twoslash
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
  factory: '0x0000000000ffe8b47b3e2130213b802212439497', // [!code focus]
  factoryData: '0xdeadbeef',
})
```

### factoryData (可选)

- **类型:**

在工厂上执行的 calldata 以部署合约。

```ts twoslash
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
  factory: '0x0000000000ffe8b47b3e2130213b802212439497',
  factoryData: '0xdeadbeef', // [!code focus]
})
```

### stateOverride (可选)

- **类型:** [`StateOverride`](/docs/glossary/types#stateoverride)

状态覆盖集是一个可选的地址到状态的映射，其中每个条目指定在执行调用之前要临时覆盖的一些状态。

```ts
const data = await publicClient.readContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'totalSupply',
  stateOverride: [ // [!code focus]
    { // [!code focus]
      address: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC', // [!code focus]
      balance: parseEther('1'), // [!code focus]
      stateDiff: [ // [!code focus]
        { // [!code focus]
          slot: '0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0', // [!code focus]
          value: '0x00000000000000000000000000000000000000000000000000000000000001a4', // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    } // [!code focus]
  ], // [!code focus]
})
```

## 实时示例

查看下面的实时 [读取合约示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_reading-contracts) 中 `readContract` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_reading-contracts?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>