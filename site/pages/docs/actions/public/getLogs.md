---
description: 返回与提供的参数匹配的事件日志列表。
---

# getLogs

返回与提供的参数匹配的**事件**日志列表。

## 用法

默认情况下，`getLogs` 返回所有事件。在实际使用中，你必须使用作用域来过滤特定事件。

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const logs = await publicClient.getLogs()  // [!code focus:99]
// @log: 输出: [{ ... }, { ... }, { ... }]
```

```ts twoslash [client.ts] filename="client.ts"
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

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem'
import { publicClient } from './client'

const logs = await publicClient.getLogs({  // [!code focus:99]
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256)'),
  args: {
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
  fromBlock: 16330000n,
  toBlock: 16330050n
})
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

默认情况下，`event` 接受 [`AbiEvent`](/docs/glossary/types#abievent) 类型：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const logs = await publicClient.getLogs(publicClient, {
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: { // [!code focus:8]
    name: 'Transfer', 
    inputs: [
      { type: 'address', indexed: true, name: 'from' },
      { type: 'address', indexed: true, name: 'to' },
      { type: 'uint256', indexed: false, name: 'value' }
    ] 
  },
  args: {
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
  fromBlock: 16330000n,
  toBlock: 16330050n
})
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 地址

日志可以作用于一个**地址**：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const logs = await publicClient.getLogs({
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2' // [!code focus]
})
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 事件

日志可以作用于一个**事件**。

`event` 参数接受 ABI 格式的事件 – 我们有一个 [`parseAbiItem` 工具](/docs/abi/parseAbiItem)，你可以用它将人类可读的事件签名转换为 ABI。

:::code-group

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem' // [!code focus]
import { publicClient } from './client'

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), // [!code focus]
})
```

```ts twoslash [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 参数

日志可以作用于给定的**_索引_参数**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```

只有 `event` 中的索引参数才是 `args` 的候选。

参数也可以是一个数组，以指示该位置可以存在其他值：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
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

日志可以作用于一个**区块范围**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  fromBlock: 16330000n, // [!code focus]
  toBlock: 16330050n // [!code focus]
})
```

### 多个事件

日志可以作用于**多个事件**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbi } from 'viem'

const logs = await publicClient.getLogs({
  events: parseAbi([ // [!code focus:4]
    'event Approval(address indexed owner, address indexed sender, uint256 value)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
  ]),
})
```

注意：作用于多个事件的日志不能同时作用于 [索引参数](#arguments) (`args`)。

### 严格模式

默认情况下，`getLogs` 将包括那些 [不符合](/docs/glossary/terms#non-conforming-log) `event` 上的索引和非索引参数的日志。
viem 不会返回不符合 ABI 的参数的值，因此，`args` 中的一些参数可能是未定义的。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem' 

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
})

logs[0].args
//      ^? 






```

你可以开启 `strict` 模式，仅返回符合 `event` 上的索引和非索引参数的日志，这意味着 `args` 将始终被定义。缺点是不符合的日志将被过滤掉。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem' 

const logs = await publicClient.getLogs({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  strict: true
})

logs[0].args
//      ^?






```

## 返回

[`Log[]`](/docs/glossary/types#log)

事件日志列表。

## 参数

### address

- **类型:** [`Address | Address[]`](/docs/glossary/types#address)

合约地址或合约地址列表。结果中将仅包含来自合约的日志。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const logs = await publicClient.getLogs({
  address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
})
```

### 事件

- **类型：** [`AbiEvent`](/docs/glossary/types#abievent)

ABI 格式的事件。

从 viem 导出的 [`parseAbiItem` 工具](/docs/abi/parseAbiItem) 可以将人类可读的事件签名转换为 ABI。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const logs = await publicClient.getLogs({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), // [!code focus]
})
```

### 参数

- **类型：** 推断。

一组 _索引_ 事件参数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const logs = await publicClient.getLogs({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  },
})
```

### fromBlock

- **类型：** `bigint | 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

开始包含日志的区块。与 `blockHash` 互斥。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createEventFilter({
  fromBlock: 69420n // [!code focus]
})
```

### toBlock

- **类型：** `bigint | 'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`

停止包含日志的区块。与 `blockHash` 互斥。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createEventFilter({
  toBlock: 70120n // [!code focus]
})
```

### blockHash

- **类型：** `'0x${string}'`

包含日志的区块哈希。与 `fromBlock`/`toBlock` 互斥。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const logs = await publicClient.getLogs({
  blockHash: '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d' // [!code focus]
})
```

## 实时示例

查看下面的实时 [事件日志示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs) 中 `getLogs` 的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/logs_event-logs?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>

## JSON-RPC 方法

[`eth_getLogs`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)