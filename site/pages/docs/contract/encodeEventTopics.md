---
description: 将事件（可选参数）编码为过滤器主题。
---

# encodeEventTopics

将事件（可选参数）编码为过滤器主题。

## 安装

```ts
import { encodeEventTopics } from 'viem'
```

## 用法

下面是一个非常基本的示例，演示如何在没有参数的情况下编码事件主题。

:::code-group

```ts [example.ts]
import { encodeEventTopics } from 'viem'
import { wagmiAbi } from './abi.ts'

const topics = encodeEventTopics({
  abi: wagmiAbi,
  eventName: 'Transfer'
})
// ["0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0"]
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

### 传递参数

如果你的事件有索引参数，可以通过 `args` 属性传递它们的值。

`args` 的 TypeScript 类型将根据事件名称和 ABI 推断，以防止你插入错误的值。

例如，下面的 `Transfer` 事件接受 **address** 参数用于 `from` 和 `to` 属性，并且其类型为 `"0x${string}"`。

:::code-group

```ts [example.ts]
import { encodeEventTopics } from 'viem'

const topics = encodeEventTopics({
  abi: wagmiAbi,
  eventName: 'Transfer',
  args: {
    from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
  }
})
// ["0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0", "0x00000000000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266", "0x0000000000000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c8"]
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

### 没有 `eventName`

如果你的 `abi` 仅包含一个 ABI 项，你可以省略 `eventName`（它变为可选）：

```ts
import { encodeEventTopics } from 'viem'

const abiItem = {
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
}

const topics = encodeEventTopics({
  abi: [abiItem],
  eventName: 'Transfer' // [!code --]
})
// ["0x406dade31f7ae4b5dbc276258c28dde5ae6d5c2773c5745802c493a2360e55e0"]
```

## 返回值

编码后的主题。

## 参数

### abi

- **类型：** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const data = encodeEventTopics({
  abi: wagmiAbi, // [!code focus]
  functionName: 'Transfer',
})
```

### eventName

- **类型：** `string`

事件的名称。

```ts
const data = encodeEventTopics({
  abi: wagmiAbi,
  eventName: 'Transfer', // [!code focus]
})
```

### args（可选）

- **类型：** `string`

一组 _indexed_ 事件参数。

```ts
const data = encodeEventTopics({
  abi: wagmiAbi,
  eventName: 'Transfer',
  args: { // [!code focus:4]
    from: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    to: '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac'
  }
})
```