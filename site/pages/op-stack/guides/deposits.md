---
head:
  - - meta
    - property: og:title
      content: 存款
  - - meta
    - name: description
      content: 如何从主网存款到 OP Stack 链。
  - - meta
    - property: og:description
      content: 如何从主网存款到 OP Stack 链。

---

# 存款

本指南将演示如何将 **1 Ether** 从 **主网** 存款（桥接）到 **[Optimism (OP Mainnet)](https://www.optimism.io/)**。

## 概述

以下是执行存款交易的端到端概述。我们将其分解为 [步骤](#steps)。

:::code-group

```ts [deposit.ts]
import { getL2TransactionHashes } from 'viem/op-stack'
import { account, publicClientL1, publicClientL2, walletClientL1 } from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1'),
  to: account.address,
})
 
// 在 L1 上执行存款交易。
const hash = await walletClientL1.depositTransaction(args)

// 等待 L1 交易被处理。
const receipt = await publicClientL1.waitForTransactionReceipt({ hash })

// 从 L1 交易收据中获取 L2 交易哈希。
const [l2Hash] = getL2TransactionHashes(receipt)

// 等待 L2 交易被处理。
const l2Receipt = await publicClientL2.waitForTransactionReceipt({ 
  hash: l2Hash 
})
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

## 步骤

### 1. 设置 Viem 客户端

首先，我们将为主网和 Optimism 链设置我们的 Viem 客户端，包括 OP Stack 所需的扩展。

我们将这些放在 `config.ts` 文件中。

:::info

以下示例展示了如何为 **JSON-RPC 账户（浏览器扩展、WalletConnect 等）** 或 **本地账户（私钥）** 设置客户端。

:::

:::code-group

```ts [config.ts (JSON-RPC 账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

```ts [config.ts (本地账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

### 2. 构建存款交易

接下来，我们将使用在上一步中创建的客户端在 Optimism (L2) 链上构建存款交易。

在下面的示例中，我们希望将 **1 Ether**（通过 `mint`）存入 Optimism 链，存入我们自己（`account.address`）。

:::info

`mint` 值是要在 Optimism (L2) 链上存款（铸造）的值。它从账户的主网 (L1) 余额中扣除。

如果你想，也可以使用其他人的地址作为 `to` 值。

:::

:::code-group

```ts [deposit.ts]
// 导入 Viem 客户端。
import { publicClientL2 } from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1'),
  to: account.address,
})
```

```ts [config.ts (JSON-RPC 账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

```ts [config.ts (本地账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

### 3. 执行存款交易

之后，我们将在主网 (L1) 链上执行存款交易。

:::code-group

```ts [deposit.ts]
// 导入 Viem 客户端。
import { account, publicClientL2, walletClientL1 } from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1'),
  to: account.address,
})

// 在 L1 上执行存款交易。 // [!code focus]
const hash = await walletClientL1.depositTransaction(args) // [!code focus]
```

```ts [config.ts (JSON-RPC 账户)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const clientL1 = createClient({
  account, 
  chain: mainnet,
  transport: fallback([custom(window.ethereum), http()])
})
  .extend(publicActions)
  .extend(walletActionsL1())

export const clientL2 = createClient({
  chain: optimism,
  transport: http()
})
  .extend(publicActions)
  .extend(publicActionsL2())
```

```ts [config.ts (Local Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

### 4. 等待交易被处理

一旦我们将交易广播到主网 (L1) 链，我们需要等待它在区块上被处理，以便提取交易收据。我们需要交易收据来提取 Optimism (L2) 链上的交易。

:::info

当交易被处理时，`mint` 值 (1 Ether) 将从账户的主网 (L1) 余额中扣除。

:::

:::code-group

```ts [deposit.ts]
// 导入 Viem 客户端。
import { 
  account, 
  publicClientL1, 
  publicClientL2,
  walletClientL1 
} from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1')
  to: account.address,
})

// 在 L1 上执行存款交易。 
const hash = await walletClientL1.depositTransaction(args) 

// 等待 L1 交易被处理。 // [!code focus]
const receipt = await publicClientL1.waitForTransactionReceipt({ hash }) // [!code focus]
```

```ts [config.ts (JSON-RPC Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const clientL1 = createClient({
  account, 
  chain: mainnet,
  transport: fallback([custom(window.ethereum), http()])
})
  .extend(publicActions)
  .extend(walletActionsL1())

export const clientL2 = createClient({
  chain: optimism,
  transport: http()
})
  .extend(publicActions)
  .extend(publicActionsL2())
```

```ts [config.ts (Local Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

### 5. 计算 L2 交易哈希

一旦我们从主网 (L1) 链获得交易收据，我们可以从交易收据的日志中提取 Optimism (L2) 交易哈希。

:::code-group

```ts [deposit.ts]
// 导入 Viem 客户端。
import { 
  account, 
  publicClientL1, 
  publicClientL2,
  walletClientL1 
} from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1')
  to: account.address,
})

// 在 L1 上执行存款交易。 
const hash = await walletClientL1.depositTransaction(args) 

// 等待 L1 交易被处理。 
const receipt = await publicClientL1.waitForTransactionReceipt({ hash }) 

// 从 L1 交易收据中获取 L2 交易哈希。 // [!code focus]
const [l2Hash] = getL2TransactionHashes(receipt) // [!code focus]
```

```ts [config.ts (JSON-RPC Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const clientL1 = createClient({
  account, 
  chain: mainnet,
  transport: fallback([custom(window.ethereum), http()])
})
  .extend(publicActions)
  .extend(walletActionsL1())

export const clientL2 = createClient({
  chain: optimism,
  transport: http()
})
  .extend(publicActions)
  .extend(publicActionsL2())
```

```ts [config.ts (Local Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

:::

### 6. 等待交易被处理

现在我们有了 Optimism (L2) 交易哈希，我们可以等待交易在 Optimism (L2) 链上被处理。

一旦 `waitForTransactionReceipt` 调用解析，交易就被处理，你现在应该在 Optimism (L2) 链上获得 1 Ether 🥳。

:::code-group

```ts [deposit.ts]
// 导入 Viem 客户端。
import { 
  account, 
  publicClientL1, 
  publicClientL2,
  walletClientL1 
} from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1')
  to: account.address,
})

// 在 L1 上执行存款交易。 
const hash = await walletClientL1.depositTransaction(args) 

// 等待 L1 交易被处理。 
const receipt = await publicClientL1.waitForTransactionReceipt({ hash }) 

// 从 L1 交易收据中获取 L2 交易哈希。 
const [l2Hash] = getL2TransactionHashes(receipt) 

// 等待 L2 交易被处理。 // [!code focus]
const l2Receipt = await publicClientL2.waitForTransactionReceipt({  // [!code focus]
  hash: l2Hash  // [!code focus]
}) // [!code focus]
```

```ts [config.ts (JSON-RPC Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 
export const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
}) 

export const clientL1 = createClient({
  account, 
  chain: mainnet,
  transport: fallback([custom(window.ethereum), http()])
})
  .extend(publicActions)
  .extend(walletActionsL1())

export const clientL2 = createClient({
  chain: optimism,
  transport: http()
})
  .extend(publicActions)
  .extend(publicActionsL2())
```

```ts [config.ts (Local Account)]
// 导入 Viem 模块。
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const account = privateKeyToAccount('0x...')

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClientL1 = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: optimism,
  transport: http()
}).extend(publicActionsL2())
```

## 示例

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wagmi-dev/viem/tree/main/examples/op-stack_deposit?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>