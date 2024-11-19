---
description: 解码 ABI 编码的事件主题和数据。
---

# decodeEventLog

解码 ABI 编码的事件主题和数据（来自 [事件日志](/docs/glossary/terms#event-log)）为事件名称和结构化参数（包括索引和非索引）。

## 安装

```ts
import { decodeEventLog } from 'viem'
```

## 用法

:::code-group

```ts [example.ts]
import { decodeEventLog } from 'viem'
import { wagmiAbi } from './abi.ts'

const topics = decodeEventLog({
  abi: wagmiAbi,
  data: '0x0000000000000000000000000000000000000000000000000000000000000001',
  topics: [
    '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
    '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
  ]
})
/**
 *  {
 *    eventName: 'Transfer',
 *    args: {
 *      from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
 *      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
 *      value: 1n
 *    }
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
  ...
] as const;
```

:::

### 部分解码

默认情况下，如果 `topics` 和 `data` 不符合 ABI（索引和非索引参数的数量不匹配），`decodeEventLog` 将抛出错误。

例如，以下代码将抛出错误，因为非 `indexed` 参数与 `data` 长度不匹配。

```ts
decodeEventLog({
  abi: parseAbi(['event Transfer(address indexed, address, uint256)']), // [!code focus]
  // `data` 应为 64 字节，但仅为 32 字节。 // [!code focus]
  data: '0x0000000000000000000000000000000000000000000000000000000000000001', // [!code focus]
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  ]
})
// [DecodeLogDataMismatch]: 非索引事件参数的数据大小为 32 字节，太小。
```

`decodeEventLog` 可以尝试部分解码日志，可以通过将 `strict` 参数设置为 `false` 来实现：

```ts 
decodeEventLog({ // [!code focus]
  abi: parseAbi(['event Transfer(address indexed, address, uint256)']), // [!code focus]
  data: '0x0000000000000000000000000000000000000000000000000000000000000001', // [!code focus]
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  ],
  strict: false // [!code ++]
})
/**
 * {
 *   eventName: 'Transfer',
 *   args: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266']
 * }
 */
```

## 返回值

```ts
{
  eventName: string;
  args: Inferred;
}
```

解码的 ABI 事件主题。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const topics = decodeEventLog({
  abi: wagmiAbi, // [!code focus]
  data: '0x0000000000000000000000000000000000000000000000000000000000000001',
  topics: [
    '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
    '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
  ]
})
```

### topics

- **类型:** `[Hex, ...(Hex | Hex[] | null)[]]`

一组来自 [事件日志](/docs/glossary/terms#event-log) 的主题（编码的索引参数）。

```ts
const topics = decodeEventLog({
  abi: wagmiAbi,
  data: '0x0000000000000000000000000000000000000000000000000000000000000001',
  topics: [ // [!code focus:5]
    '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
    '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
  ]
})
```

### data（可选）

- **类型:** `string`

来自 [事件日志](/docs/glossary/terms#event-log) 的数据（编码的非索引参数）。

```ts
const topics = decodeEventLog({
  abi: wagmiAbi,
  data: '0x0000000000000000000000000000000000000000000000000000000000000001', // [!code focus]
  topics: [
    '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
    '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
  ]
})
```

### eventName（可选）

- **类型:** `string`

来自 ABI 的事件名称。提供 `eventName` 以推断 `decodeEventLog` 的返回类型。

```ts
const topics = decodeEventLog({
  abi: wagmiAbi,
  eventName: 'Transfer', // [!code focus]
  topics: [
    '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
    '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
  ]
})
```

### strict（可选）

- **类型:** `boolean`
- **默认值:** `true`

如果为 `true`，`decodeEventLog` 将在 `data` 和 `topics` 长度不符合 ABI 中的事件时抛出错误。
如果为 `false`，`decodeEventLog` 将尝试 [部分解码](#partial-decode)。

```ts
const topics = decodeEventLog({
  abi: wagmiAbi,
  strict: false, // [!code focus]
  topics: [
    '0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0', 
    '0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
    '0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8'
  ]
})
```