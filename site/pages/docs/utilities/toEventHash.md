---
description: 返回给定事件定义的哈希（事件签名的哈希）。
---

# toEventHash

返回给定事件定义的哈希（事件签名的哈希）。

## 安装

```ts
import { toEventHash } from 'viem'
```

## 用法

```ts twoslash
import { toEventHash } from 'viem'

const hash_1 = toEventHash('event Transfer(address,address,uint256)')
// @log: 输出: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef

const hash_2 = toEventHash({
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

事件签名的哈希。

## 参数

### event

- **类型:** `string` | [`AbiEvent`](https://abitype.dev/api/types#abievent)

要生成哈希的事件。