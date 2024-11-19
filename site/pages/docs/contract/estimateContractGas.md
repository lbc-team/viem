---
description: 估算成功执行合约写入函数调用所需的 gas。
---

# estimateContractGas

估算成功执行合约写入函数调用所需的 gas。

在内部，`estimateContractGas` 使用 [公共客户端](/docs/clients/public) 调用 [`estimateGas` 操作](/docs/actions/public/estimateGas)，并使用 [ABI 编码的 `data`](/docs/contract/encodeFunctionData)。

## 用法

以下是一个非常基本的估算 gas 的示例（没有参数）。

`mint` 函数不接受任何参数，并返回一个代币 ID。

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'
import { wagmiAbi } from './abi'

const gas = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account,
})
// 69420n
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: "mint",
    outputs: [{ name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  ...
] as const;
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

// JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 传递参数

如果你的函数需要参数，可以通过 `args` 属性传递它们。

`args` 的 TypeScript 类型将从函数名称和 ABI 推断，以防止你插入错误的值。

例如，下面的 `mint` 函数名称需要一个 **tokenId** 参数，并且它的类型为 `[number]`。

:::code-group

```ts [example.ts] {8}
import { account, publicClient } from './config'
import { wagmiAbi } from './abi'

const gas = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account,
})
// 69420n
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "owner", type: "uint32" }],
    name: "mint",
    outputs: [{ name: "", type: "uint32" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  ...
] as const;
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

// JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## 返回值

`bigint`

gas 估算值。

## 参数

### address

- **类型：** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'mint',
  account,
})
```

### abi

- **类型：** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  functionName: 'mint',
  account,
})
```

### functionName

- **类型：** `string`

要从 ABI 中提取的函数。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint', // [!code focus]
  account,
})
```

### account

- **类型：** `Account | Address`

用于估算 gas 的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' // [!code focus]
})
```

### accessList（可选）

- **类型：** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  accessList: [{ // [!code focus:4]
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    storageKeys: ['0x1'],
  }], 
  account,
})
```

### args（可选）

- **类型：** 从 ABI 推断。

传递给函数调用的参数。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'], // [!code focus]
  account,
})
```

### gasPrice（可选）

- **类型：** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account,
  gasPrice: parseGwei('20'), // [!code focus]
})
```

### maxFeePerGas（可选）

- **类型：** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account,
  maxFeePerGas: parseGwei('20'),  // [!code focus]
})
```

### maxPriorityFeePerGas（可选）

- **类型：** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
})
```

### nonce（可选）

- **类型：** `number`

唯一标识此交易的数字。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account,
  nonce: 69 // [!code focus]
})
```

### value（可选）

- **类型：** `number`

与此交易一起发送的 wei 值。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account,
  value: parseEther('1') // [!code focus]
})
```

### blockNumber（可选）

- **类型：** `number`

要执行读取的区块号。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account,
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag（可选）

- **类型：** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值：** `'latest'`

要执行读取的区块标签。

```ts
const { result } = await publicClient.estimateContractGas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account,
  blockTag: 'safe', // [!code focus]
})
```