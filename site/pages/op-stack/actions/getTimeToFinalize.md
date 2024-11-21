---
outline: deep
description: 返回可以完成提款交易的时间。
---

# getTimeToFinalize

返回可以完成提款交易的时间。用于 [提款](/op-stack/guides/withdrawals) 流程。

## 用法

:::code-group

```ts [example.ts]
import { optimism } from 'viem/chains'
import { account, publicClientL1, publicClientL2 } from './config'

const receipt = await publicClientL2.getTransactionReceipt({
  hash: '0x9a2f4283636ddeb9ac32382961b22c177c9e86dd3b283735c154f897b1a7ff4a',
})

const [message] = getWithdrawals(receipt)

const { // [!code hl]
  period, // [!code hl]
  seconds, // [!code hl]
  timestamp, // [!code hl]
} = await publicClientL1.getTimeToFinalize({ // [!code hl]
  withdrawalHash: message.withdrawalHash, // [!code hl]
  targetChain: optimism // [!code hl]
}) // [!code hl]
```

```ts [config.ts]
import { createPublicClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: custom(window.ethereum)
})
```

:::

## 返回

`{ period: number, seconds: number, timestamp: number }`

- `period` 为最终阶段的秒数（最大等待时间）。
- `seconds` 直到交易可以完成的时间。
- `timestamp` 交易可以完成的时间戳。

## 参数

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

L2 链。

```ts
const { seconds } = await publicClientL1.getTimeToFinalize({
  withdrawalHash: '0x...', // [!code focus]
  targetChain: optimism, // [!code focus]
})
```

### withdrawalHash

- **类型:** `Hash`

提款哈希。

```ts
const { seconds, timestamp } = await publicClientL1.getTimeToFinalize({ 
  withdrawalHash: '0x...', // [!code focus]
  targetChain: optimism, 
}) 
```

### l2OutputOracleAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.l2OutputOracle[chainId].address`

[L2 输出预言机合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/L2OutputOracle.sol) 的地址。默认为在 `targetChain` 上指定的 L2 输出预言机合约。

如果提供了 `l2OutputOracleAddress`，则 `targetChain` 参数变为可选。

```ts
const { seconds } = await publicClientL1.getTimeToFinalize({
  withdrawalHash: '0x...',
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed'
})
```

### portalAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.portal[chainId].address`

[Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 的地址。默认为在 `targetChain` 上指定的 L2 输出预言机合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const { seconds } = await publicClientL1.getTimeToFinalize({
  withdrawalHash: '0x...',
  l2OutputOracleAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```