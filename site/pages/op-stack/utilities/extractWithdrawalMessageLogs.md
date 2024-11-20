---
description: 从不透明的日志数组中提取“MessagePassed”日志，以初始化提款。
---

# extractWithdrawalMessageLogs

从不透明的日志数组中提取 [`MessagePassed` 日志](https://github.com/ethereum-optimism/optimism/blob/9f73402cb4341f7cfa83bf79769c8dddd9b014c0/packages/contracts-bedrock/src/L2/L2ToL1MessagePasser.sol#L29-L45)，以初始化提款。

## 导入
```ts
import { extractWithdrawalMessageLogs } from 'viem'
```

## 用法

```ts
import { extractWithdrawalMessageLogs } from 'viem'

const receipt = await client.getTransactionReceipt({
  hash: '0xc9c0361bc3da9cd3560e48b469d0d6aac0e633e4897895edfd26a287f7c578ec',
})

const logs = extractWithdrawalMessageLogs(receipt)
// [
//   { args: { ... }, blockHash: '0x...', eventName: 'MessagePassed'  },
//   { args: { ... }, blockHash: '0x...', eventName: 'MessagePassed'  },
//   { args: { ... }, blockHash: '0x...', eventName: 'MessagePassed'  },
// ]
```

## 返回

`Log[]`

`MessagePassed` 日志。

## 参数

### logs

- **类型:** `Log[]`

一个不透明日志的数组。

```ts
const logs = extractWithdrawalMessageLogs({ 
  logs: receipt.logs // [!code focus]
})
```