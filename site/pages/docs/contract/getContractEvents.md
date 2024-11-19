---
description: 返回与提供的参数匹配的事件日志列表。 
---

# getContractEvents

返回与提供的参数匹配的合约 **事件日志** 列表。

## 用法

默认情况下，`getContractEvents` 返回 ABI 上所有匹配的事件。在实际操作中，你必须使用作用域来过滤特定事件。

:::code-group

```ts [example.ts]
import { publicClient } from './client'
import { erc20Abi } from './abi'

// 获取每个 ERC-20 合约上每个事件的事件日志。 // [!code focus:99]
const logs = await publicClient.getContractEvents({ 
  abi: erc20Abi 
})
// [{ ... }, { ... }, { ... }]
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  }
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

## 作用域

你还可以作用于一组给定的属性。

:::code-group

```ts [example.ts]
import { parseAbiItem } from 'viem'
import { publicClient } from './client'
import { erc20Abi } from './abi'

const usdcContractAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // [!code focus:99]

const logs = await publicClient.getContractEvents({ 
  address: usdcContractAddress,
  abi: erc20Abi,
  eventName: 'Transfer',
  args: {
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
  fromBlock: 16330000n,
  toBlock: 16330050n
})
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  }
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

### 地址

日志可以作用于一个 **地址**：

:::code-group

```ts [example.ts]
import { publicClient } from './client'
import { erc20Abi } from './abi'

const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2', // [!code focus]
})
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  }
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

### 事件

日志可以作用于一个 **事件**。

:::code-group

```ts [example.ts]
import { parseAbiItem } from 'viem' // [!code focus]
import { publicClient } from './client'
import { erc20Abi } from './abi'

const logs = await publicClient.getContractEvents({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  abi: erc20Abi,
  eventName: 'Transfer', // [!code focus]
})
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
  }
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

### 参数

日志可以作用于给定的 **_indexed_ 参数**：

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  eventName: 'Transfer',
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```

只有 `event` 中的索引参数才是 `args` 的候选。

参数也可以是一个数组，以指示该位置可以存在其他值：

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  eventName: 'Transfer',
  args: { // [!code focus:8]
    // '0xd8da...' 或 '0xa5cc...' 或 '0xa152...'
    from: [
      '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 
      '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac',
      '0xa152f8bb749c55e9943a3a0a3111d18ee2b3f94e',
    ],
  }
})
```

### 区块范围

日志可以作用于一个 **区块范围**：

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  eventName: 'Transfer',
  fromBlock: 16330000n, // [!code focus]
  toBlock: 16330050n // [!code focus]
})
```

### 严格模式

默认情况下，`getContractEvents` 将包括 [不符合](/docs/glossary/terms#non-conforming-log) 索引和非索引参数的日志。
viem 不会返回不符合 ABI 的参数的值，因此，`args` 中的一些参数可能是未定义的。

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  eventName: 'Transfer',
})

logs[0].args // [!code focus]
//      ^? { address?: Address, to?: Address, value?: bigint } // [!code focus]
```

你可以开启 `strict` 模式，仅返回符合索引和非索引参数的日志，这意味着 `args` 将始终被定义。缺点是不符合的日志将被过滤掉。

```ts 
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  eventName: 'Transfer',
  strict: true
})

logs[0].args // [!code focus]
//      ^? { address: Address, to: Address, value: bigint } // [!code focus]
```

## 返回

[`Log[]`](/docs/glossary/types#log)

事件日志的列表。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi, // [!code focus]
})
```

### address

- **类型:** [`Address | Address[]`](/docs/glossary/types#address)

合约地址或合约地址列表。仅包含来自合约的日志将包含在结果中。

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
})
```

### eventName

- **类型:** `string`

ABI 上的事件名称。

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  eventName: 'Transfer' // [!code focus]
})
```

### args

- **类型：** 推断。

一个 _indexed_ 事件参数的列表。

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  eventName: 'Transfer',
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
})
```

### fromBlock

- **类型：** `bigint | 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

开始包含日志的区块。与 `blockHash` 互斥。

```ts
const filter = await publicClient.getContractEvents({
  abi: erc20Abi,
  fromBlock: 69420n // [!code focus]
})
```

### toBlock

- **类型：** `bigint | 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

停止包含日志的区块。与 `blockHash` 互斥。

```ts
const filter = await publicClient.getContractEvents({
  abi: erc20Abi,
  toBlock: 70120n // [!code focus]
})
```

### blockHash

- **类型：** `'0x${string}'`

包含日志的区块哈希。与 `fromBlock`/`toBlock` 互斥。

```ts
const logs = await publicClient.getContractEvents({
  abi: erc20Abi,
  blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```

## JSON-RPC 方法

[`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getLogs)