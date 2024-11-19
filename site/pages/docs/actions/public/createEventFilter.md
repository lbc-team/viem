# createEventFilter [创建新事件过滤器的操作。]

创建一个过滤器以监听新事件，可与 [`getFilterChanges`](/docs/actions/public/getFilterChanges) 一起使用。

## 用法

默认情况下，带有无参数的事件过滤器将查询/监听所有事件。

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createEventFilter()
// @log: { id: "0x345a6572337856574a76364e457a4366", type: 'event' }
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

:::tip
如果你想要一个一流的解决方案来查询合约上的事件，而无需手动构造 ABI 事件参数，请查看 [`createContractEventFilter`](/docs/contract/createContractEventFilter)。
:::

## 范围

你还可以将过滤器限制为一组给定的属性（如下所示）。

### 地址

过滤器可以限制为一个 **地址**：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createEventFilter({
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

过滤器可以限制为一个 **事件**。

`event` 参数接受 ABI 格式的事件 – 我们有一个 [`parseAbiItem` 工具](/docs/abi/parseAbiItem)，你可以用它将人类可读的事件签名转换为 ABI。

:::code-group

```ts twoslash [example.ts]
import { parseAbiItem } from 'viem' // [!code focus]
import { publicClient } from './client'

const filter = await publicClient.createEventFilter({
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

默认情况下，`event` 接受 [`AbiEvent`](/docs/glossary/types#abievent) 类型：

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const filter = await publicClient.createEventFilter(publicClient, {
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: { // [!code focus:99]
    name: 'Transfer', 
    inputs: [
      { type: 'address', indexed: true, name: 'from' },
      { type: 'address', indexed: true, name: 'to' },
      { type: 'uint256', indexed: false, name: 'value' }
    ] 
  }
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

过滤器可以限制为给定的 **_索引_ 参数**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const filter = await publicClient.createEventFilter({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```

只有 `event` 中的索引参数才是 `args` 的候选。

过滤器参数也可以是一个数组，以指示该位置可以存在其他值：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const filter = await publicClient.createEventFilter({
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

过滤器可以限制为一个 **区块范围**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const filter = await publicClient.createEventFilter({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  fromBlock: 16330000n, // [!code focus]
  toBlock: 16330050n // [!code focus]
})
```

### 多个事件

过滤器可以限制为 **多个事件**：

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbi } from 'viem'

const filter = await publicClient.createEventFilter({
  events: parseAbi([ // [!code focus:4]
    'event Approval(address indexed owner, address indexed sender, uint256 value)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
  ]),
})
```

注意：限制为多个事件的过滤器不能同时限制为 [索引参数](#arguments) (`args`)。

### 严格模式

默认情况下，`createEventFilter` 将包括 [不符合](/docs/glossary/terms#non-conforming-log) 索引和非索引参数的日志。
viem 不会返回不符合 ABI 的参数值，因此，`args` 中的一些参数可能是未定义的。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const filter = await publicClient.createEventFilter({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
})
const logs = await publicClient.getFilterLogs({ filter })

logs[0].args
//      ^?






```

你可以开启 `strict` 模式，仅返回符合索引和非索引参数的日志，这意味着 `args` 将始终被定义。权衡是，非符合的日志将被过滤掉。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const filter = await publicClient.createEventFilter({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  strict: true
})
const logs = await publicClient.getFilterLogs({ filter })

logs[0].args
//      ^?






```

## 返回

[`Filter`](/docs/glossary/types#filter)

## 参数

### address (可选)

- **类型：** `Address | Address[]`

合约地址或应来源于的地址列表。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createEventFilter({
  address: '0xfba3912ca04dd458c843e2ee08967fc04f3579c2' // [!code focus]
})
```

### event (可选)

- **类型：** [`AbiEvent`](/docs/glossary/types#abievent)

ABI 格式的事件。

从 viem 导出的 [`parseAbiItem` 工具](/docs/abi/parseAbiItem) 可以将人类可读的事件签名转换为 ABI。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem' // [!code focus]

const filter = await publicClient.createEventFilter({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), // [!code focus]
})
```

### args (可选)

- **类型:** 推断。

一组*索引*事件参数。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
import { parseAbiItem } from 'viem'

const filter = await publicClient.createEventFilter({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```

### fromBlock (可选)

- **类型:** `bigint`

开始查询/监听的区块。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createEventFilter({
  fromBlock: 69420n // [!code focus]
})
```

### toBlock (可选)

- **类型:** `bigint`

查询/监听直到的区块。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const filter = await publicClient.createEventFilter({
  toBlock: 70120n // [!code focus]
})
```

## JSON-RPC 方法

[`eth_newFilter`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter)