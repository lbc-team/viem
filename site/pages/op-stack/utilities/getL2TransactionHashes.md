---
description: 计算来自 L1 “TransactionDeposited” 日志数组的 L2 交易哈希。
---

# getL2TransactionHashes

计算来自 L1 `TransactionDeposited` 日志数组的 L2 交易哈希。

用于从 **L1 交易收据** 中提取 L2 哈希。

## 导入
```ts
import { getL2TransactionHashes } from 'viem'
```

## 用法

```ts
import { extractTransactionDepositedLogs, getL2TransactionHashes } from 'viem'

const receipt = await client.getTransactionReceipt({
  hash: '0xa08acae48f12243bccd7153c88d892673d5578cce4ee9988c0332e8bba47436b',
})

const l2Hashes = getL2TransactionHashes(receipt) // [!code hl]
```

## 返回

`Hex`

L2 交易哈希。

## 参数

### logs

- **类型:** `Log[]`

L1 日志数组。

```ts
const l2Hashes = getL2TransactionHash({ 
  logs: receipt.logs // [!code focus]
})
```