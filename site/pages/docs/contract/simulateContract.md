# simulateContract [模拟和验证合约交互]

`simulateContract` 函数 **模拟**/**验证** 合约交互。这对于检索合约写入函数的 **返回数据** 和 **回退原因** 非常有用。

此函数执行时不需要 gas，并且 ***不会*** 更改区块链的状态。它与 [`readContract`](/docs/contract/readContract) 几乎相同，但也支持合约写入函数。

在内部，`simulateContract` 使用 [Public Client](/docs/clients/public) 调用 [`call` 操作](/docs/actions/public/call) 以及 [ABI 编码的 `data`](/docs/contract/encodeFunctionData)。

## 用法

以下是如何在合约上模拟写入函数（无参数）的非常基本的示例。

`mint` 函数不接受任何参数，并返回一个代币 ID。

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'
import { wagmiAbi } from './abi'

const { result } = await publicClient.simulateContract({
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
export const [account] = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
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

`args` 的 TypeScript 类型将根据函数名称和 ABI 推断，以防止你插入错误的值。

例如，下面的 `mint` 函数名称需要一个 **tokenId** 参数，并且它的类型为 `[number]`。

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'
import { wagmiAbi } from './abi'

const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420], // [!code focus]
  account,
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "owner", type: "uint32" }],
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
export const [account] = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 与 `writeContract` 配对

`simulateContract` 函数也与 `writeContract` 很好地配对。

在下面的示例中，我们正在 **验证** 合约写入是否会成功，通过 `simulateContract`。如果没有抛出错误，那么一切都很好。之后，我们执行合约写入以执行交易。

:::code-group

```ts [example.ts]
import { account, walletClient, publicClient } from './config'
import { wagmiAbi } from './abi'

const { request } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account,
})
const hash = await walletClient.writeContract(request)
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
import { createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

// JSON-RPC 账户
export const [account] = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 处理自定义错误

在下面的示例中，我们正在 **捕获** `simulateContract` 抛出的 [自定义错误](https://blog.soliditylang.org/2021/04/21/custom-errors/)。在合约的 `abi` 中包含自定义错误项非常重要。

你可以通过错误的 `data` 属性访问自定义错误：

:::code-group

```ts [example.ts] {13-27}
import { BaseError, ContractFunctionRevertedError } from 'viem';
import { account, walletClient, publicClient } from './config'
import { wagmiAbi } from './abi'

try {
  await publicClient.simulateContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: wagmiAbi,
    functionName: 'mint',
    account,
  })
} catch (err) {
  if (err instanceof BaseError) {
    const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
    if (revertError instanceof ContractFunctionRevertedError) {
      const errorName = revertError.data?.errorName ?? ''
      // 对 `errorName` 做一些处理
    }
  }
}

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
  // 自定义 Solidity 错误
  {
    type: 'error',
    inputs: [],
    name: 'MintIsDisabled'
  },
  ...
] as const;
```

```solidity [WagmiExample.sol]
// ...
error MintIsDisabled();
contract WagmiExample {
  // ...

    function mint() public {
      // ...
      revert MintIsDisabled();
      // ...
    }

  // ...
}
```

```ts [config.ts]
import { createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

// JSON-RPC 账户
export const [account] = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 状态覆盖

在使用 `simulateContract` 时，有时需要进行初始状态更改以使交易通过。一个常见的用例是批准。为此，有 [状态覆盖](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-eth#eth-call)。在下面的示例中，我们正在模拟代表另一个用户发送代币。为此，我们需要修改代币合约的状态，以便从代币所有者那里获得最大批准。

:::code-group

```ts twoslash [example.ts]
import { account, publicClient } from './config'
import { abi, address } from './contract'

// 允许额度槽：一个 32 字节的十六进制字符串，表示发送者的允许额度槽。
const allowanceSlot = '0x....'

// 最大允许额度：一个 32 字节的十六进制字符串，表示最大允许额度 (2^256 - 1)
const maxAllowance = numberToHex(maxUint256)

const { result } = await publicClient.simulateContract({
  abi,
  address,
  account,
  functionName: 'transferFrom',
  args: [
    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    account.address, 
    69420n
  ],
  stateOverride: [ // [!code hl]
    { // [!code hl]
      // 修改代币合约的状态 // [!code hl]
      address, // [!code hl]
      stateDiff: [ // [!code hl]
        { // [!code hl]
          slot: allowanceSlot, // [!code hl]
          value: maxAllowance, // [!code hl]
        }, // [!code hl]
      ], // [!code hl]
    }, // [!code hl]
  ], // [!code hl]
})

console.log(result)
// @log: 输出: true
```

```ts twoslash [contract.ts] filename="contract.ts"
export const address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

export const abi = [
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        type: 'bool',
      },
    ],
  },
] as const
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const account = privateKeyToAccount('0x...')
 
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## 返回值

模拟结果和写入请求。类型是推断的。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})
```

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})
```

### functionName

- **类型:** `string`

要从 ABI 中提取的函数。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint', // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})
```

### account

- **类型:** `Account | Address`

要模拟合约方法的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' // [!code focus]
})
```

### accessList (可选)

- **类型:** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  accessList: [{ // [!code focus:4]
    address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    storageKeys: ['0x1'],
  }],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})
```

### authorizationList (可选)

- **类型:** `AuthorizationList`

签名的 EIP-7702 授权列表。

```ts
const authorization = await walletClient.signAuthorization({ 
  contractAddress: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', 
}) 

const { result } = await publicClient.simulateContract({
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
const { result } = await publicClient.simulateContract({
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'], // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  blockNumber: 15121123n, // [!code focus]
})
```

### blockTag (可选)

- **类型:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认:** `'latest'`

要执行读取的区块标签。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  blockTag: 'safe', // [!code focus]
})
```

### dataSuffix (可选)

- **类型:** `Hex`

要附加到 calldata 末尾的数据。用于添加 ["domain" 标签](https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f)。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  dataSuffix: '0xdeadbeef' // [!code focus]
})
```

### gas (可选)

- **类型:** `bigint`

交易的 gas 限制。

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
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  gasPrice: parseGwei('20'), // [!code focus]
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  maxFeePerGas: parseGwei('20'),  // [!code focus]
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
})
```

### nonce (可选)

- **类型:** `number`

唯一标识此交易的数字。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  nonce: 69 // [!code focus]
})
```

### stateOverride (可选)

- **类型:** [`StateOverride`](/docs/glossary/types#stateoverride)

状态覆盖集是一个可选的地址到状态的映射，其中每个条目指定在执行调用之前要临时覆盖的某些状态。

> 注意：通过使用状态覆盖，你可以基于虚假状态模拟合约。使用此功能对于测试目的很有用，但基于返回的 `request` 对象进行交易可能会失败，无论模拟结果如何。

```ts
const data = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
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

### value（可选）

- **类型：** `number`

与此交易一起发送的 wei 值。

```ts
const { result } = await publicClient.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  value: parseEther('1') // [!code focus]
})
```

## 实时示例

查看下面的实时 [写入合约示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts) 中 `simulateContract` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>