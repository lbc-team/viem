---
description: 从 L1 "TransactionDeposited" 日志计算 L2 交易哈希。
---

# getL2TransactionHash

从 L1 `TransactionDeposited` 日志计算 L2 交易哈希。

:::warning

对于从 L1 交易收据检索 L2 交易哈希的一般情况，你可能想使用 [getL2TransactionHashes](/op-stack/utilities/getL2TransactionHashes)。

:::

## 导入
```ts
import { getL2TransactionHash } from 'viem'
```

## 用法

```ts
import { extractTransactionDepositedLogs, getL2TransactionHash } from 'viem'

const receipt = await client.getTransactionReceipt({
  hash: '0xa08acae48f12243bccd7153c88d892673d5578cce4ee9988c0332e8bba47436b',
})

const [log] = extractTransactionDepositedLogs(receipt)

const l2Hash = getL2TransactionHash({ log }) // [!code hl]
```

## 返回

`Hex`

L2 交易哈希。

## 参数

### log

- **类型:** `Log`

一个 L1 `TransactionDeposited` 日志。

```ts
const l2Hash = getL2TransactionHash({ 
  log: { // [!code focus]
    args: { // [!code focus]
      from: '0x1a1E021A302C237453D3D45c7B82B19cEEB7E2e6', // [!code focus]
      opaqueData: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000045000000000000520800', // [!code focus]
      to: '0x1a1E021A302C237453D3D45c7B82B19cEEB7E2e6', // [!code focus]
      version: 0n, // [!code focus]
    }, // [!code focus]
    blockHash: '0x634c52556471c589f42db9131467e0c9484f5c73049e32d1a74e2a4ce0f91d57', // [!code focus]
    eventName: 'TransactionDeposited', // [!code focus]
    logIndex: 109, // [!code focus]
  } // [!code focus]
})
```