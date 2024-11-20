# 客户端 [使用 OP Stack 设置你的 Viem 客户端]

要使用 Viem 的 OP Stack 功能，你必须使用 OP Stack 操作扩展现有的（或新的）Viem 客户端。

## 用法

### 第一层扩展

```ts
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { walletActionsL1 } from 'viem/op-stack' // [!code hl]

const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
}).extend(walletActionsL1()) // [!code hl]

const hash = await walletClient.depositTransaction({/* ... */})
```

### 第二层扩展

```ts
import { createPublicClient, http } from 'viem'
import { base } from 'viem/chains'
import { publicActionsL2 } from 'viem/op-stack' // [!code hl]

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
}).extend(publicActionsL2()) // [!code hl]

const l1Gas = await publicClient.estimateL1Gas({/* ... */})
```

## 扩展

### `walletActionsL1`

一套适用于与 **第一层** 链交互的 **第二层 (OP Stack)** 链开发的 [钱包操作](/op-stack/actions/estimateL1Gas)。

```ts
import { walletActionsL1 } from 'viem/op-stack'
```

### `publicActionsL1`

一套适用于与 **第一层** 链开发的 [公共操作](/op-stack/actions/getTimeToProve)。这些操作提供了特定于在第一层级别操作的公共客户端的功能，使其能够与第二层协议无缝交互。

```ts
import { publicActionsL1 } from 'viem/op-stack'
```

### `walletActionsL2`

一套适用于与 **第二层 (OP Stack)** 链开发的 [钱包操作](/op-stack/actions/estimateL1Fee)。这些操作专为在第二层上运行的钱包量身定制，提供了进行第二层金融操作所需的高级功能和集成。

```ts
import { walletActionsL2 } from 'viem/op-stack'
```

### `publicActionsL2`

一套适用于与 **第二层 (OP Stack)** 链开发的 [公共操作](/op-stack/actions/estimateL1Gas)。

```ts
import { publicActionsL2 } from 'viem/op-stack'
```