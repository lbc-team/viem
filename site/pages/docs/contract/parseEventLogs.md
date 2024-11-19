---
description: '从一组不透明日志中提取和解码日志。'
---

# parseEventLogs

从一组不透明日志中提取和解码与提供的 `abi`（和可选的 `eventName`）匹配的日志。

对于解码交易收据上的日志非常有用。

## 安装

```ts
import { parseEventLogs } from 'viem'
```

## 用法

:::code-group

```ts [example.ts]
import { parseEventLogs } from 'viem'
import { erc20Abi } from './abi'
import { client } from './client'

const receipt = await getTransactionReceipt(client, {
  hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
})

const logs = parseEventLogs({ 
  abi: erc20Abi, 
  logs: receipt.logs,
})
// [
//   { args: { ... }, eventName: 'Transfer', logIndex: 3 ... },  
//   { args: { ... }, eventName: 'Approval', logIndex: 5 ... },
//   ...
// ]
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  }
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 限定事件名称

你可以通过提供 `eventName` 参数来限制日志到特定事件名称：

:::code-group

```ts [example.ts]
import { parseEventLogs } from 'viem'
import { erc20Abi } from './abi'
import { client } from './client'

const receipt = await getTransactionReceipt(client, {
  hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
})

const logs = parseEventLogs({ 
  abi: erc20Abi, 
  eventName: 'Transfer', // [!code hl]
  logs: receipt.logs,
})
// [
//   { args: { ... }, eventName: 'Transfer', logIndex: 3, ... },  
//   { args: { ... }, eventName: 'Transfer', logIndex: 7, ... },
//   ...
// ]
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  }
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

你还可以传递一个数组以限制多个事件名称：

:::code-group

```ts [example.ts]
import { parseEventLogs } from 'viem'
import { erc20Abi } from './abi'
import { client } from './client'

const receipt = await getTransactionReceipt(client, {
  hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
})

const logs = parseEventLogs({ 
  abi: erc20Abi, 
  eventName: ['Transfer', 'Approval'], // [!code hl]
  logs: receipt.logs,
})
// [
//   { args: { ... }, eventName: 'Transfer', logIndex: 3, ... },  
//   { args: { ... }, eventName: 'Approval', logIndex: 5, ... },  
//   { args: { ... }, eventName: 'Transfer', logIndex: 7, ... },
//   ...
// ]
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  }
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 限定参数

你可以通过提供 `args` 参数来限制日志到参数：

:::code-group

```ts [example.ts]
import { parseEventLogs } from 'viem'
import { erc20Abi } from './abi'
import { client } from './client'

const receipt = await getTransactionReceipt(client, {
  hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
})

const logs = parseEventLogs({ 
  abi: erc20Abi, 
  args: { // [!code focus]
    from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  }, // [!code focus]
  logs: receipt.logs,
})
// [
//   { args: { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ... }, eventName: '...', logIndex: 3, ... },  
//   { args: { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ... }, eventName: '...', logIndex: 7, ... },
//   ...
// ]
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  }
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

你还可以传递一个数组以限制参数的多个值：

:::code-group

```ts [example.ts]
import { parseEventLogs } from 'viem'
import { erc20Abi } from './abi'
import { client } from './client'

const receipt = await getTransactionReceipt(client, {
  hash: '0xec23b2ba4bc59ba61554507c1b1bc91649e6586eb2dd00c728e8ed0db8bb37ea',
})

const logs = parseEventLogs({ 
  abi: erc20Abi, 
  args: { // [!code focus]
    from: [ // [!code focus]
      '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
      '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // [!code focus]
    ], // [!code focus]
  }, // [!code focus]
  logs: receipt.logs,
})
// [
//   { args: { from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', ... }, eventName: '...', logIndex: 3, ... },  
//   { args: { from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', ... }, eventName: '...', logIndex: 7, ... },
//   ...
// ]
```

```ts [abi.ts]
export const erc20Abi = [
  ...
  {
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  }
  ...
] as const;
```

```ts [client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 部分解码

默认情况下，如果 `topics` 和 `data` 不符合 ABI（索引参数和非索引参数的数量不匹配），`parseEventLogs` 将不会返回解码的日志。

例如，以下内容将不会返回不符合的日志，因为在非 `indexed` 参数和 `data` 长度之间存在不匹配。

```ts
parseEventLogs({
  abi: parseAbi(['event Transfer(address indexed, address, uint256)']),
  logs: [{
    // `data` 应该是 64 字节，但只有 32 字节。 // [!code hl]
    data: '0x0000000000000000000000000000000000000000000000000000000000000001', // [!code hl]
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    ]
    // ...
  }]
})
// []
```

`parseEventLogs` 可以尝试部分解码日志，这可以通过将 `strict` 参数设置为 `false` 来实现：

```ts
parseEventLogs({
  abi: parseAbi(['event Transfer(address indexed, address, uint256)']),
  logs: [{
    data: '0x0000000000000000000000000000000000000000000000000000000000000001',
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    ]
    // ...
  }]
  strict: false // [!code ++]
})
/**
 * [
 *  {
 *    eventName: 'Transfer',
 *    args: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
 *    blockNumber: 42069420n,
 *    logIndex: 69,
 *    ...
 *  }
 * ]
 */
```

## 返回值

`Log[]`

解码后的日志。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const topics = parseEventLogs({
  abi: wagmiAbi, // [!code focus]
  logs: [{
    blockNumber: 69420n,
    data: '0x0000000000000000000000000000000000000000000000000000000000000001',
    logIndex: 1,
    topics: [
      '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
      '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
      '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
    ]
    // ...
  }]
})
```

### logs

- **类型:** `Log[]`

要解析的日志数组。

```ts
const topics = parseEventLogs({
  abi: wagmiAbi,
  logs: [{ // [!code focus]
    blockNumber: 69420n, // [!code focus]
    data: '0x0000000000000000000000000000000000000000000000000000000000000001', // [!code focus]
    logIndex: 1, // [!code focus]
    topics: [ // [!code focus]
      '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0',  // [!code focus]
      '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
      '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8' // [!code focus]
    ] // [!code focus]
    // ... // [!code focus]
  }] // [!code focus]
})
```

### args（可选）

- **类型:** `{ [property: string]: string | string[] | null }`

用于限制日志的参数。

```ts
const topics = parseEventLogs({
  abi: wagmiAbi,
  args: { // [!code focus]
    from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  }, // [!code focus]
  logs: [{
    blockNumber: 69420n,
    data: '0x0000000000000000000000000000000000000000000000000000000000000001',
    logIndex: 1,
    topics: [
      '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
      '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
      '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
    ]
    // ...
  }]
})
```

### eventName（可选）

- **类型:** `string`

ABI 中的事件名称。

```ts
const topics = parseEventLogs({
  abi: wagmiAbi,
  eventName: 'Transfer', // [!code focus]
  logs: [{
    blockNumber: 69420n,
    data: '0x0000000000000000000000000000000000000000000000000000000000000001',
    logIndex: 1,
    topics: [
      '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
      '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
      '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
    ]
    // ...
  }]
})
```

### strict（可选）

- **类型:** `boolean`
- **默认值:** `true`

如果为 `true`，`parseEventLogs` 将不会返回 [不符合的日志](#partial-decode)。 
如果为 `false`，`parseEventLogs` 将尝试 [部分解码](#partial-decode) 不符合的日志。

```ts
const topics = parseEventLogs({
  abi: wagmiAbi,
  eventName: 'Transfer',
  logs: [{
    blockNumber: 69420n,
    data: '0x0000000000000000000000000000000000000000000000000000000000000001',
    logIndex: 1,
    topics: [
      '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
      '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
      '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
    ]
    // ...
  }],
  strict: false // [!code focus]
})
```