---
description: 设置你的 ZKsync Viem 客户端
---

# 客户端

要使用 Viem 的 ZKsync 功能，你必须使用 ZKsync 操作扩展现有的（或新的）Viem 客户端。

## 用法

```ts twoslash
import 'viem/window'
// ---cut---
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { zksync } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync'
 
const walletClient = createWalletClient({
  chain: zksync,
  transport: custom(window.ethereum!),
}).extend(eip712WalletActions()) // [!code hl]

const publicClient = createPublicClient({
  chain: zksync,
  transport: http()
})
```

## 扩展

### `eip712WalletActions`

一套适用于与 ZKsync 链开发的 [钱包操作](/zksync/actions/sendTransaction)。

```ts twoslash
import { eip712WalletActions } from 'viem/zksync'
```

#### 使用支付主账户发送交易

[阅读更多](./actions/sendTransaction.md)

```ts
const hash = await walletClient.sendTransaction({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
  paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
  paymasterInput: '0x123abc...'
})
```

#### 调用合约

[阅读更多](../docs/contract/writeContract.md)

```ts
import { simulateContract } from 'viem/contract'

const { request } = await publicClient.simulateContract(walletClient, {
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
});
const hash = await walletClient.writeContract(request)
```

### `publicActionsL1`

一套适用于与 **Layer 1** 链开发的 [公共操作](/zksync/actions/getL1Allowance)。这些操作提供了特定于在 Layer 1 级别运行的公共客户端的功能，使其能够与 Layer 2 协议无缝交互。

```ts
import { publicActionsL1 } from 'viem/zksync'
```