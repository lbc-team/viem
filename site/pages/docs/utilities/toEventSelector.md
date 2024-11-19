---
description: 返回给定事件定义的事件选择器。
---

# toEventSelector

返回给定事件定义的事件选择器。

## 安装

```ts
import { toEventSelector } from 'viem'
```

## 用法

```ts twoslash
import { toEventSelector } from 'viem'

const selector_1 = toEventSelector('Transfer(address,address,uint256)')
// @log: 输出: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

const selector_2 = toEventSelector('Transfer(address indexed from, address indexed to, uint256 amount)')
// @log: 输出: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

// 或者从你的合约 ABI 中的 `AbiEvent`
const selector_3 = toEventSelector({
  name: 'Transfer',
  type: 'event',
  inputs: [
    { name: 'from', type: 'address', indexed: true },
    { name: 'to', type: 'address', indexed: true },
    { name: 'amount', type: 'uint256', indexed: false },
  ],
})
// @log: 输出: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
```

## 返回

[`Hex`](/docs/glossary/types#hex)

选择器作为十六进制值。

## 参数

### event

- **类型:** `string |`[`AbiEvent`](https://abitype.dev/api/types#abievent)

要生成选择器的事件。