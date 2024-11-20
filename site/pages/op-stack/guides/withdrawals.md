---
head:
  - - meta
    - property: og:title
      content: 提现
  - - meta
    - name: description
      content: 如何从 OP Stack 链提取到主网。
  - - meta
    - property: og:description
      content: 如何从 OP Stack 链提取到主网。

---

# 提现

本指南将演示如何从 **[Optimism (OP Mainnet)](https://www.optimism.io/)** 提取 **1 Ether** 到 **主网**。

## 概述

在 OP Stack 上的提现是一个 [两步（加一步）过程](https://blog.oplabs.co/two-step-withdrawals/)。该过程包括：

0. **发起** L2 上的提现交易，
   
> *等待一小时（最多）以便提议包含交易的 L2 输出。*

1. **证明** L1 上的提现交易，

> *等待 7 天的最终确认期*

2. **完成** L1 上的提现交易。

> *提现完成！*

以下是执行提现的完整端到端概述。别担心，我们将在下面的 [步骤](#steps) 中详细说明。

:::code-group

```ts [withdrawal.ts]
import { getWithdrawals } from 'viem/op-stack'
import { 
  account, 
  publicClientL1, 
  walletClientL1,
  publicClientL2, 
  walletClientL2 
} from './config'

// 构建参数以在 L1 上发起提现交易。
const args = await publicClientL1.buildInitiateWithdrawal({
  to: account.address,
  value: parseEther('1')
})
 
// 在 L2 上执行发起提现交易。
const hash = await walletClientL2.initiateWithdrawal(args)

// 等待发起提现交易的收据。
const receipt = await publicClientL2.waitForTransactionReceipt({ hash })

// 等待直到提现准备好进行证明。
const { output, withdrawal } = await publicClientL1.waitToProve({
  receipt,
  targetChain: walletClientL2.chain
})

// 构建参数以在 L2 上证明提现。
const proveArgs = await publicClientL2.buildProveWithdrawal({
  output,
  withdrawal,
})

// 在 L1 上证明提现。
const proveHash = await walletClientL1.proveWithdrawal(proveArgs)

// 等待直到证明提现被处理。
const proveReceipt = await publicClientL1.waitForTransactionReceipt({
  hash: proveHash
})

// 等待直到提现准备好完成。
await publicClientL1.waitToFinalize({
  targetChain: walletClientL2.chain,
  withdrawalHash: withdrawal.withdrawalHash,
})

// 完成提现。
const finalizeHash = await walletClientL1.finalizeWithdrawal({
  targetChain: walletClientL2.chain,
  withdrawal,
})

// 等待直到提现完成。
const finalizeReceipt = await publicClientL1.waitForTransactionReceipt({
  hash: finalizeHash
})
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: http()
}).extend(walletActionsL2())
```

:::

## 步骤

### 1. 设置 Viem 客户端

首先，我们将为主网和 Optimism 链设置我们的 Viem 客户端，包括 OP Stack 所需的扩展。

我们将需要以下客户端：

- `publicClientL1`/`walletClientL1`：主网的公共和钱包客户端
- `publicClientL2`/`walletClientL2`：OP 主网的公共和钱包客户端

我们将把这些放在 `config.ts` 文件中。

:::info

以下示例展示了如何为 **JSON-RPC 账户（浏览器扩展、WalletConnect 等）** 或 **本地账户（私钥）** 设置客户端

:::

:::code-group

```ts [config.ts (JSON-RPC 账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: http()
}).extend(walletActionsL2())
```

:::

### 2. 发起提现

接下来，我们将通过在 L1 上构建参数（1）来发起 L2 上的提现交易，然后在 L2 上执行交易（2）。我们还希望在继续之前等待 L2 交易在区块上被处理（3）。

在下面的示例中，我们正在从 L2（OP 主网）发起 **1 Ether** 的提现到 L1（主网）。

:::code-group

```ts [withdrawal.ts]
import { 
  account, 
  publicClientL1,
  publicClientL2, 
  walletClientL2 
} from './config'

// 1. 构建参数以在 L1 上发起提现交易。
const args = await publicClientL1.buildInitiateWithdrawal({
  to: account.address,
  value: parseEther('1')
})
 
// 2. 在 L2 上执行发起提现交易。
const hash = await walletClientL2.initiateWithdrawal(args)

// 3. 等待发起提现交易的收据。
const receipt = await publicClientL2.waitForTransactionReceipt({ hash })
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者获取账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: http()
}).extend(walletActionsL2())
```

:::

### 3. 证明提款

在 L2 上的提款交易被处理到一个区块后，我们需要在 L1 上证明该提款。

在提款交易可以被证明之前，该交易需要包含在 L2 输出提案中。在此之前，我们需要等待提款交易准备好被证明 (1)。这通常最多需要 **一个小时**。

一旦 L2 输出被提案，我们需要构建在 L2 上证明提款交易的参数 (2)，然后在 L1 上执行该交易 (3)。我们还希望在继续之前等待 L1 交易在一个区块上被处理 (4)。

:::code-group

```ts [withdrawal.ts]
import { 
  account, 
  publicClientL1,
  publicClientL2, 
  walletClientL1,
  walletClientL2 
} from './config'

// （快捷方式）从步骤 1 中创建的交易获取收据。
const receipt = 
  await publicClientL2.getTransactionReceipt({ hash: '0x...' })

// 1. 等待提款准备好被证明。 // [!code hl]
const { output, withdrawal } = await publicClientL1.waitToProve({ // [!code hl] 
  receipt, // [!code hl]
  targetChain: walletClientL2.chain // [!code hl]
}) // [!code hl]

// 2. 构建在 L2 上证明提款的参数。 // [!code hl]
const args = await publicClientL2.buildProveWithdrawal({ // [!code hl]
  output, // [!code hl]
  withdrawal, // [!code hl]
}) // [!code hl]

// 3. 在 L1 上证明提款。 // [!code hl]
const hash = await walletClientL1.proveWithdrawal(args) // [!code hl]

// 4. 等待证明提款被处理。 // [!code hl]
const receipt = await publicClientL1.waitForTransactionReceipt({ // [!code hl]
  hash // [!code hl]
}) // [!code hl]
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者获取账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: http()
}).extend(walletActionsL2())
```

:::

:::tip
如果你想从 `waitToProve` 方法中提取证明提款的预计剩余时间并将其显示给用户或存储在数据库中，可以利用 [`getTimeToProve`](/op-stack/actions/getTimeToProve) 操作。

```ts
const { seconds, timestamp } = await publicClientL1.getTimeToProve({
  receipt,
  targetChain: walletClientL2.chain
})
```
:::

:::warning
如果你不使用 `waitToProve` 操作，强烈建议使用 [`getWithdrawalStatus`](/op-stack/actions/getWithdrawalStatus) 操作检查提款是否准备好被证明。这将防止你证明尚未准备好的提款。

```ts
const status = await publicClientL1.getWithdrawalStatus({
  receipt,
  targetChain: walletClientL2.chain
})

if (status === 'ready-to-prove') {
  // ...
}
```
:::

### 4. 完成提款

当提款交易被证明后，我们需要在 L1 上完成该提款。

在提款交易可以被完成之前，我们需要等待 **7 天** 的 **最终确认期** (1)。

在最终确认期结束后，我们可以完成提款 (2)。

一旦提款成功完成 (3)，那么提款就完成了！ 🥳

:::code-group

```ts [withdrawal.ts]
import { getWithdrawals } from 'viem/op-stack'
import { 
  account, 
  publicClientL1,
  publicClientL2, 
  walletClientL1,
  walletClientL2 
} from './config'

// （快捷方式）从步骤 1 中创建的交易获取收据。
const receipt = 
  await publicClientL2.getTransactionReceipt({ hash: '0x...' })

// （快捷方式）从步骤 3 中的收据获取提款。
const [withdrawal] = getWithdrawals(receipt)

// 1. 等待提款准备好完成。  // [!code hl]
await publicClientL1.waitToFinalize({ // [!code hl]
  targetChain: walletClientL2.chain, // [!code hl]
  withdrawalHash: withdrawal.withdrawalHash, // [!code hl]
}) // [!code hl]

// 2. 完成提款。 // [!code hl]
const hash = await walletClientL1.finalizeWithdrawal({ // [!code hl]
  targetChain: walletClientL2.chain, // [!code hl]
  withdrawal, // [!code hl]
}) // [!code hl]

// 3. 等待提款完成。 // [!code hl]
const receipt = await publicClientL1.waitForTransactionReceipt({ // [!code hl]
  hash // [!code hl]
}) // [!code hl]
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者获取账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL1, walletActionsL2 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())

export const walletClientL2 = createWalletClient({
  account,
  chain: optimism,
  transport: http()
}).extend(walletActionsL2())
```

:::

:::tip
如果你想提取从 `waitToFinalize` 方法中估计的最终化提取所需的时间并将其显示给用户或存储在数据库中，可以利用 [`getTimeToFinalize`](/op-stack/actions/getTimeToFinalize) 操作。

```ts
const { seconds, timestamp } = await publicClientL1.getTimeToFinalize({
  receipt,
  targetChain: walletClientL2.chain
})
```
:::

:::warning
如果你没有使用 `waitToFinalize` 操作，强烈建议通过使用 [`getWithdrawalStatus`](/op-stack/actions/getWithdrawalStatus) 操作来检查提取是否准备好最终化。这将防止你最终化尚未准备好的提取。

```ts
const status = await publicClientL1.getWithdrawalStatus({
  receipt,
  targetChain: walletClientL2.chain
})

if (status === 'ready-to-finalize') {
  // ...
}
```
:::