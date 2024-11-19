---
description: 返回给定事件或事件定义的签名。
---

# toEventSignature

返回给定事件定义的签名。

:::tip
这仅返回**事件签名**。如果你需要**完整的人类可读定义**，请查看 ABIType 的 [`formatAbiItem`](https://abitype.dev/api/human#formatabiitem-1)。
:::

## 安装

```ts
import { toEventSignature } from 'viem'
```

## 用法

```ts twoslash
import { toEventSignature } from 'viem'

// 从事件定义
const signature_1 = toEventSignature('event Transfer(address indexed from, address indexed to, uint256 amount)')
// @log: 输出: Transfer(address,address,uint256)

// 从你的合约 ABI 中的 `AbiEvent`
const signature_2 = toEventSignature({
  name: 'Transfer',
  type: 'event',
  inputs: [
    { name: 'address', type: 'address', indexed: true },
    { name: 'address', type: 'address', indexed: true },
    { name: 'uint256', type: 'uint256', indexed: false },
  ],
})
// @log: 输出: Transfer(address,address,uint256)
```

## 返回

`string`

签名作为字符串值。

## 参数

### definition

- **类型:** `string | AbiEvent`

生成签名的事件定义。