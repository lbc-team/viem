---
description: 在合约上执行写入函数。
---

# writeContract

在合约上执行写入函数。

Solidity 合约上的“写入”函数会修改区块链的状态。这类函数需要消耗 gas，因此需要广播一个 [Transaction](/docs/glossary/terms) 来改变状态。

在内部，`writeContract` 使用 [Wallet Client](/docs/clients/wallet) 调用 [`sendTransaction` action](/docs/actions/wallet/sendTransaction) 并传递 [ABI 编码的 `data`](/docs/contract/encodeFunctionData)。

:::warning

`writeContract` 在内部发送一个交易——它 **不** 验证合约写入是否会成功（合约可能会抛出错误）。强烈建议在执行之前使用 `simulateContract` [模拟合约写入](#usage)。

:::

## 用法

下面是如何在合约上执行写入函数的一个非常基本的示例（没有参数）。

虽然你可以单独使用 `writeContract` [by itself](#standalone)，但强烈建议将其与 [`simulateContract`](/docs/contract/simulateContract) 配对，以验证合约写入是否会无错误地执行。

:::code-group

```ts [example.ts]
import { account, publicClient, walletClient } from './config'
import { wagmiAbi } from './abi'

const { request } = await publicClient.simulateContract({
  account,
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
})
await walletClient.writeContract(request)
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  ...
] as const;
```

```ts [config.ts]
import { createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

### 传递参数

如果你的函数需要参数，可以通过 `args` 属性传递它们。

`args` 的 TypeScript 类型将根据函数名称和 ABI 推断，以防止你插入错误的值。

例如，下面的 `mint` 函数名称需要一个 **tokenId** 参数，并且其类型为 `[number]`。

:::code-group

```ts [example.ts] {8}
import { account, walletClient } from './client'
import { wagmiAbi } from './abi'

const { request } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account
})
await walletClient.writeContract(request)
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "tokenId", type: "uint32" }],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  ...
] as const;
```

```ts [config.ts]
import { createWalletClient, custom, http} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses()
// 本地账户
export const account = privateKeyToAccount('0x...')
```

:::

### 独立使用

如果你不需要对合约写入进行验证，也可以单独使用它：

:::code-group

```ts [example.ts]
import { account, walletClient } from './config'
import { wagmiAbi } from './abi'

await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account,
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  ...
] as const;
```

```ts [config.ts]
import { createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses()
// 本地账户
export const account = privateKeyToAccount('0x...')
```

:::


## 返回值

[`Hash`](/docs/glossary/types#hash)

一个 [Transaction Hash](/docs/glossary/terms#hash)。

与 [`readContract`](/docs/contract/readContract) 不同，`writeContract` 仅返回一个 [Transaction Hash](/docs/glossary/terms#hash)。如果你想检索写入函数的返回数据，可以使用 [`simulateContract` action](/docs/contract/simulateContract)——此操作不会执行交易，也不需要 gas（它与 `readContract` 非常相似）。

## 参数

### address

- **类型：** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
```

### abi

- **类型：** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  functionName: 'mint',
  args: [69420]
})
```

### functionName

- **类型：** `string`

要从 ABI 中提取的函数。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint', // [!code focus]
  args: [69420]
})
```

### account

- **类型：** `Account | Address | null`

要从中写入合约的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。如果设置为 `null`，则假定传输将处理交易发送者的填充。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' // [!code focus]
})
```

### accessList（可选）

- **类型：** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  accessList: [{ // [!code focus:4]
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    storageKeys: ['0x1'],
  }],
})
```

### authorizationList（可选）

- **类型：** `AuthorizationList`

签名的 EIP-7702 授权列表。

```ts
const authorization = await walletClient.signAuthorization({ 
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', 
}) 

await walletClient.writeContract({
  address: account.address,
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  authorizationList: [authorization], // [!code focus]
})
```

:::note
**参考**
- [EIP-7702 概述](/experimental/eip7702)
- [`signAuthorization` 文档](/experimental/eip7702/signAuthorization)
:::

### args (可选)

- **类型:** 从 ABI 推断。

传递给函数调用的参数。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420] // [!code focus]
})
```

### chain (可选)

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `walletClient.chain`

目标链。如果钱包的当前链与目标链不匹配，将抛出错误。

该链还用于推断其请求类型（例如，Celo 链有一个 `gatewayFee`，可以通过 `sendTransaction` 传递）。

```ts
import { optimism } from 'viem/chains' // [!code focus]

await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  chain: optimism, // [!code focus]
})
```

### dataSuffix

- **类型:** `Hex`

要附加到 calldata 末尾的数据。对于添加 ["domain" 标签](https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f) 很有用。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  dataSuffix: '0xdeadbeef' // [!code focus]
})
```

### gas (可选)

- **类型:** `bigint`

交易的 gas 限制。请注意，传递 gas 限制也会跳过 gas 估算步骤。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  gas: 69420n, // [!code focus]
})
```

### gasPrice (可选)

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  gasPrice: parseGwei('20'), // [!code focus]
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  maxFeePerGas: parseGwei('20'),  // [!code focus]
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
})
```

### nonce (可选)

- **类型:** `number`

唯一编号，用于标识此交易。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  nonce: 69 // [!code focus]
})
```

### value (可选)

- **类型:** `number`

与此交易一起发送的 wei 值。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  value: parseEther('1') // [!code focus]
})
```

## 实时示例

查看下面的实时 [写入合约示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts) 中 `writeContract` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>