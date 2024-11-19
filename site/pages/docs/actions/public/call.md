# call [执行新消息调用的操作]

立即执行新的消息调用，而无需向网络提交交易。

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, publicClient } from './config'

const data = await publicClient.call({ // [!code focus:7]
  account,
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

// @log: ↓ JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'

// @log: ↓ 本地账户
// export const account = privateKeyToAccount(...)

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 无需部署的调用

可以调用尚未部署的合约上的函数。例如，我们可能想要调用尚未部署的 [ERC-4337 智能账户](https://eips.ethereum.org/EIPS/eip-4337) 合约上的函数。

Viem 提供了两种执行无部署调用的方法：

- [字节码](#bytecode)
- [部署工厂](#deploy-factory)：使用提供的 [部署工厂](https://docs.alchemy.com/docs/create2-an-alternative-to-deriving-contract-addresses#create2-contract-factory) “临时部署”合约，并在已部署的合约上调用函数。

:::tip
**无部署调用**模式也可以通过 [`readContract`](/docs/contract/readContract#deployless-reads) 和 [合约实例](/docs/contract/getContract) API 访问。
:::

#### 字节码

下面的示例演示了如何通过字节码使用无部署调用来调用尚未部署的 [Wagmi 示例 ERC721 合约](https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2#code) 的 `name` 函数：

:::code-group

```ts twoslash [example.ts]
import { encodeFunctionData, parseAbi } from 'viem'
import { publicClient } from './config'

const data = await publicClient.call({
  // 合约的字节码。可在此处访问: https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2#code
  code: '0x...',
  // 要在合约上调用的函数。
  data: encodeFunctionData({
    abi: parseAbi(['function name() view returns (string)']),
    functionName: 'name'
  }),
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

下面的示例演示了如何通过 [部署工厂](https://docs.alchemy.com/docs/create2-an-alternative-to-deriving-contract-addresses#create2-contract-factory) 使用无部署调用来调用尚未部署的 [ERC-4337 智能账户](https://eips.ethereum.org/EIPS/eip-4337) 的 `entryPoint` 函数：

:::code-group

```ts twoslash [example.ts]
import { encodeFunctionData, parseAbi } from 'viem'
import { owner, publicClient } from './config'

const data = await publicClient.call({
  // 合约部署者的地址（例如，智能账户工厂）。
  factory: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',

  // 在工厂上执行的函数以部署合约。
  factoryData: encodeFunctionData({
    abi: parseAbi(['function createAccount(address owner, uint256 salt)']),
    functionName: 'createAccount',
    args: [owner, 0n],
  }),

  // 要在合约（例如，智能账户合约）上调用的函数。
  data: encodeFunctionData({
    abi: parseAbi(['function entryPoint() view returns (address)']),
    functionName: 'entryPoint'
  }),

  // 合约的地址。
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const owner = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

:::note
此示例使用 [SimpleAccountFactory](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/samples/SimpleAccountFactory.sol)。
:::

## 返回值

`0x${string}`

调用数据。

## 参数

### account

- **类型：** `Account | Address`

要调用的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### data

- **类型：** `0x${string}`

带有编码参数的合约哈希方法调用。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### to

- **类型：** [`Address`](/docs/glossary/types#address)

合约地址或接收者。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
})
```

### accessList（可选）

- **类型：** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  accessList: [ // [!code focus:6]
    {
      address: '0x1',
      storageKeys: ['0x1'],
    },
  ],
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### blockNumber（可选）

- **类型：** `number`

要执行调用的区块号。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  blockNumber: 15121123n, // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### blockTag（可选）

- **类型：** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **默认值：** `'latest'`

要执行调用的区块标签。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  blockTag: 'safe', // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### code（可选）

- **类型：**

要执行调用的字节码。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  code: '0x...', // [!code focus]
  data: '0xdeadbeef',
})
```

### factory (可选)

- **类型：**

合约部署工厂地址（即 Create2 工厂、智能账户工厂等）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  factory: '0x0000000000ffe8b47b3e2130213b802212439497', // [!code focus]
  factoryData: '0xdeadbeef',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### factoryData (可选)

- **类型：**

在工厂上执行的 calldata 以部署合约。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  factory: '0x0000000000ffe8b47b3e2130213b802212439497',
  factoryData: '0xdeadbeef', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### gas (可选)

- **类型：** `bigint`

用于交易执行的 gas。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  gas: 1_000_000n, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### gasPrice (可选)

- **类型：** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseGwei } from 'viem'

const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### maxFeePerGas (可选)

- **类型：** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseGwei } from 'viem'

const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  maxFeePerGas: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### maxPriorityFeePerGas (可选)

- **类型：** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseGwei } from 'viem'

const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### nonce (可选)

- **类型：** `bigint`

唯一标识此交易的数字。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  nonce: 420, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### stateOverride (可选)

- **类型：** [`StateOverride`](/docs/glossary/types#stateoverride)

状态覆盖集是一个可选的地址到状态的映射，其中每个条目指定在执行调用之前要临时覆盖的一些状态。

```ts
const data = await publicClient.call({
  account,
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
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

### value (可选)

- **类型：** `bigint`

与此交易一起发送的值（以 wei 为单位）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseEther } from 'viem'

const data = await publicClient.call({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
})
```

## JSON-RPC 方法

[`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)