---
description: 获取提款初始化中的消息。
---

# getWithdrawals

获取从提款初始化中发出的 [`MessagePassed` 日志](https://github.com/ethereum-optimism/optimism/blob/9f73402cb4341f7cfa83bf79769c8dddd9b014c0/packages/contracts-bedrock/src/L2/L2ToL1MessagePasser.sol#L29-L45) 的提款消息。

## 导入

```ts
import { getWithdrawals } from 'viem'
```

## 用法

```ts
import { extractTransactionDepositedLogs, getWithdrawals } from 'viem'

const receipt = await client.getTransactionReceipt({
  hash: '0xa08acae48f12243bccd7153c88d892673d5578cce4ee9988c0332e8bba47436b',
})

const withdrawals = getWithdrawals(receipt) // [!code hl]
```

## 返回

`Hex`

L2 交易哈希。

## 参数

### logs

- **类型:** `Log[]`

L2 日志的数组。

```ts
const withdrawals = getWithdrawals({ 
  logs: receipt.logs // [!code focus]
})
```