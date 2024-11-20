# 扩展客户端与 EIP-7702 [设置你的 Viem 客户端]

要使用 EIP-7702 的实验性功能，你必须用实验性 EIP-7702 操作扩展现有的（或新的）Viem 客户端。

## 概述

以下是如何用 EIP-7702 操作扩展 Viem 客户端的端到端概述。我们将其分解为以下步骤。

```ts twoslash
// @noErrors
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { eip7702Actions } from 'viem/experimental'
 
const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())
 
const authorization = await walletClient.signAuthorization({/* ... */})
```

:::warning
EIP-7702 目前不支持以太坊主网或测试网。在此示例中，我们使用与 [Anvil 节点](https://book.getfoundry.sh/anvil/)（一个本地以太坊网络）接口的 `anvil` 链。
:::

## 步骤

### 0. 安装并运行 Anvil

EIP-7702 目前不支持以太坊主网或测试网，因此让我们设置一个兼容 EIP-7702 的网络。我们将使用 [Anvil 节点](https://book.getfoundry.sh/anvil/) 作为示例。如果你使用的是现有的 EIP-7702 兼容网络，可以跳过此步骤。

```bash
curl -L https://foundry.paradigm.xyz | bash
anvil --hardfork prague
```

### 1. 设置客户端

我们需要设置一个客户端来签署 EIP-7702 授权。

```ts twoslash
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
 
const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
})
```

[查看 `createWalletClient` 文档](/docs/clients/wallet)

### 2. 扩展 EIP-7702 操作

接下来，我们将导入实验性 EIP-7702 操作并在我们的客户端上扩展它们。

```ts twoslash
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { eip7702Actions } from 'viem/experimental' // [!code focus]
 
const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions()) // [!code focus]
```

### 3. 使用 EIP-7702 操作

现在我们可以使用 EIP-7702 操作，例如 [`signAuthorization`](/experimental/eip7702/signAuthorization)。

```ts twoslash
// @noErrors
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { eip7702Actions } from 'viem/experimental' 
 
const walletClient = createWalletClient({
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions()) 

const authorization = await walletClient.signAuthorization({/* ... */}) // [!code focus]
```