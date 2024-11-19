# createContractEventFilter [创建一个过滤器以检索合约事件日志。]

创建一个过滤器以检索事件日志，可以与 [`getFilterChanges`](/docs/actions/public/getFilterChanges) 或 [`getFilterLogs`](/docs/actions/public/getFilterLogs) 一起使用。

## 用法

默认情况下，带有 ABI (`abi`) 的事件过滤器将检索在 ABI 中定义的事件。

:::code-group

```ts [example.ts]
import { publicClient } from './client'
import { wagmiAbi } from './abi'

const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi
})
/**
 *  {
 *    abi: [...],
 *    id: '0x345a6572337856574a76364e457a4366',
 *    type: 'event'
 *  }
 */
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      { indexed: true, name: "to", type: "address" },
      {
        indexed: true,
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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

## 范围

你还可以将过滤器的范围限制为一组给定的属性（如下所列）。

### 地址

过滤器可以限制为一个 **地址**：

```ts 
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2' // [!code focus]
})
```

### 事件

过滤器可以限制为一个 **事件**：

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
  eventName: 'Transfer' // [!code focus]
})
```

### 参数

过滤器可以限制为给定的 **_indexed_ 参数**：

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
  eventName: 'Transfer',
  args: {  // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```

只有 `event` 中的索引参数才是 `args` 的候选。

过滤器参数也可以是一个数组，以指示该位置可以存在其他值：

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
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

过滤器可以限制为一个 **区块范围**：

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2',
  eventName: 'Transfer',
  fromBlock: 16330000n, // [!code focus]
  toBlock: 16330050n // [!code focus]
})
```

### 严格模式

默认情况下，`createContractEventFilter` 将包括 [不符合](/docs/glossary/terms#non-conforming-log) 索引和非索引参数的日志。
viem 将不会返回不符合 ABI 的参数的值，因此，`args` 中的一些参数可能是未定义的。

```ts
const filter = await publicClient.createContractEventFilter({
  eventName: 'Transfer',
})
const logs = await publicClient.getFilterLogs({ filter })

logs[0].args // [!code focus]
//      ^? { address?: Address, to?: Address, value?: bigint } // [!code focus]
```

你可以开启 `strict` 模式，仅返回符合索引和非索引参数的日志，这意味着 `args` 将始终被定义。缺点是不符合的日志将被过滤掉。

```ts 
const filter = await publicClient.createContractEventFilter({
  eventName: 'Transfer',
  strict: true
})
const logs = await publicClient.getFilterLogs({ filter })

logs[0].args // [!code focus]
//      ^? { address: Address, to: Address, value: bigint } // [!code focus]
```

## 返回

[`Filter`](/docs/glossary/types#filter)

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi, // [!code focus]
})
```

### address (可选)

- **类型:** `Address | Address[]`

合约地址或日志应来自的地址列表。如果未提供地址，则将查询所有与 ABI 上的事件签名匹配的事件。

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2' // [!code focus]
})
```

### eventName (可选)

- **类型:** `string`

事件名称。

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  eventName: 'Transfer' // [!code focus]
})
```

### args (可选)

- **类型:** 推断。

一组 _indexed_ 事件参数。

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  eventName: 'Transfer',
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```

### fromBlock (可选)

- **类型:** `bigint`

开始查询/监听的区块。

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  fromBlock: 69420n // [!code focus]
})
```

### toBlock (可选)

- **类型:** `bigint`

查询/监听直到的区块。

```ts
const filter = await publicClient.createContractEventFilter({
  abi: wagmiAbi,
  toBlock: 70120n // [!code focus]
})
```