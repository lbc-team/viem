---
description: 从不透明的日志数组中提取“TransactionDeposited”日志。
---

# extractTransactionDepositedLogs

从不透明的日志数组中提取 `TransactionDeposited` 日志。

## 导入
```ts
import { extractTransactionDepositedLogs } from 'viem'
```

## 用法

```ts
import { extractTransactionDepositedLogs } from 'viem'

const receipt = await client.getTransactionReceipt({
  hash: '0xc9c0361bc3da9cd3560e48b469d0d6aac0e633e4897895edfd26a287f7c578ec',
})

const logs = extractTransactionDepositedLogs(receipt)
// [
//   { args: { ... }, blockHash: '0x...', eventName: 'TransactionDeposited'  },
//   { args: { ... }, blockHash: '0x...', eventName: 'TransactionDeposited'  },
//   { args: { ... }, blockHash: '0x...', eventName: 'TransactionDeposited'  },
// ]
```

## 返回

`Log[]`

`TransactionDeposited` 日志。

## 参数

### logs

- **类型:** `Log[]`

一个不透明日志的数组。

```ts
const logs = extractTransactionDepositedLogs({ 
  logs: receipt.logs // [!code focus]
})
```