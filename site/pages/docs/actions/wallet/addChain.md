---
description: 将 EVM 链添加到钱包中。
---

# addChain

将 EVM 链添加到钱包中。

## 用法

:::code-group

```ts twoslash [example.ts]
import { avalanche } from 'viem/chains'
import { walletClient } from './client'
 
await walletClient.addChain({ chain: avalanche }) // [!code focus]
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::

## 参数

### chain

- **类型:** [`Chain`](/docs/glossary/types#chain)

要添加到钱包中的链。

## JSON-RPC 方法

[`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085)