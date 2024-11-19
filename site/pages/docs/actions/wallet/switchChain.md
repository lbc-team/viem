---
description: 在钱包中切换目标链。
---

# switchChain

在钱包中切换目标链。

## 用法

:::code-group

```ts twoslash [example.ts]
import { avalanche } from 'viem/chains'
import { walletClient } from './client'
 
await walletClient.switchChain({ id: avalanche.id }) // [!code focus]
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::


## 参数

### id

- **类型:** `number`

链 ID。

## JSON-RPC 方法

[`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)