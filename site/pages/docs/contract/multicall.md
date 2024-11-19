# multicall [在单个调用中批量处理合约的多个函数。]

类似于 [`readContract`](/docs/contract/readContract)，但通过 [`multicall3` 合约](https://github.com/mds1/multicall) 在单个 RPC 调用中批量处理合约的多个函数。

## 用法

:::code-group

```ts [example.ts]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const wagmiContract = {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi
} as const

const results = await publicClient.multicall({
  contracts: [
    {
      ...wagmiContract,
      functionName: 'totalSupply',
    },
    {
      ...wagmiContract,
      functionName: 'ownerOf',
      args: [69420n]
    },
    {
      ...wagmiContract,
      functionName: 'mint'
    }
  ]
})
/**
 * [
 *  { result: 424122n, status: 'success' },
 *  { result: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b', status: 'success' },
 *  { error: [ContractFunctionExecutionError: ...], status: 'failure' }
 * ]
 */
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
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [],
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

## 返回值

`({ data: <inferred>, status: 'success' } | { error: string, status: 'reverted' })[]`

一个包含结果及其状态的数组。

此外，当 [`allowFailure`](#allowfailure-optional) 设置为 `false` 时，它会直接返回一个推断数据的数组：

`(<inferred>)[]`

## 参数

### contracts.address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
      abi: wagmiAbi,
      functionName: 'totalSupply',
    },
    ...
  ]
})
```

### contracts.abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约 ABI。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi, // [!code focus]
      functionName: 'totalSupply',
    },
    ...
  ]
})
```

### contracts.functionName

- **类型**: `string`

要调用的函数名称。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'totalSupply', // [!code focus]
    },
    ...
  ]
})
```

### contracts.args (可选)

- **类型:** 从 ABI 推断。

传递给函数调用的参数。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'balanceOf',
      args: ['0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b'] // [!code focus]
    },
    ...
  ]
})
```

### allowFailure (可选)

- **类型:** `boolean`
- **默认:** `true`

如果调用失败，`multicall` 函数是否应该抛出异常。如果设置为 `true`（默认），并且调用失败，则 `multicall` 将静默失败，并且其错误将记录在 `results` 数组中。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'totalSupply',
    },
    ...
  ],
  allowFailure: false // [!code focus]
})
```

### batchSize (可选)

- **类型:** `number`
- **默认:** [`client.batch.multicall.batchSize`](/docs/clients/public#batch-multicall-batchsize-optional)（如果设置）或 `1024`

每个 calldata 块的最大大小（以字节为单位）。设置为 `0` 以禁用大小限制。

> 注意：某些 RPC 提供商限制可以在单个 `eth_call` 请求中发送的 calldata（`data`）的数量。最好与你的 RPC 提供商确认是否对 `eth_call` 请求有任何 calldata 大小限制。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'totalSupply',
    },
    ...
  ],
  batchSize: 4096 // 4kB // [!code focus]
})
```

### blockNumber (可选)

- **类型:** `number`

要执行读取的区块号。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'totalSupply',
    },
    ...
  ],
  blockNumber: 15121123n, // [!code focus]
})
```

### multicallAddress (可选)

- **类型:** [`Address`](/docs/glossary/types#address)
- **默认:** `client.chain.contracts.multicall3.address`

Multicall 合约的地址。

```ts
const results = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'totalSupply',
    },
    ...
  ],
  multicallAddress: '0xca11bde05977b3631167028862be2a173976ca11' // [!code focus]
})
```

### stateOverride (可选)

- **类型:** [`StateOverride`](/docs/glossary/types#stateoverride)

状态覆盖集是一个可选的地址到状态的映射，其中每个条目在执行调用之前指定一些状态以临时覆盖。

```ts
const data = await publicClient.multicall({
  contracts: [
    {
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: wagmiAbi,
      functionName: 'totalSupply',
    },
    ...
  ],
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

查看下面的实时 [Multicall 示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_multicall) 中 `multicall` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_multicall?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>