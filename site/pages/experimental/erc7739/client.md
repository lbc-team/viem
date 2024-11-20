# 使用 ERC-7739 动作扩展客户端 [设置你的 Viem 客户端]

要使用 ERC-7739 的实验性功能，你可以使用实验性 ERC-7739 动作扩展现有的（或新的）Viem 客户端。

```ts
import { createPublicClient, createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { erc7739Actions } from 'viem/experimental' // [!code focus]

const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
}).extend(erc7739Actions()) // [!code focus]

const id = await walletClient.signMessage({/* ... */})
```