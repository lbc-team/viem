# 链

`viem/chains` 入口点包含对流行的 EVM 兼容链的引用，例如：Polygon、Optimism、Avalanche、Base、Zora 等。

## 用法

从入口点导入你的链，并在使用 viem 的代码中使用它们：

```tsx
import { createPublicClient, http } from 'viem'
import { zora } from 'viem/chains' // [!code focus]

const client = createPublicClient({
  chain: zora, // [!code focus]
  transport: http()
})
```

[查看此处以获取支持的链列表](https://github.com/wagmi-dev/viem/tree/main/src/chains/index.ts)。

> 想要添加一个未在 viem 中列出的链？请阅读 [贡献指南](https://github.com/wagmi-dev/viem/blob/main/.github/CONTRIBUTING.md#chains)，然后提交一个包含你链的 Pull Request。

## 自定义链

你还可以通过构建自己的链对象来扩展 viem，以支持其他 EVM 兼容链，该对象继承 `Chain` 类型。

```ts
import { defineChain } from 'viem'

export const zora = defineChain({
  id: 7777777,
  name: 'Zora',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.zora.energy'],
      webSocket: ['wss://rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zora.energy' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 5882,
    },
  },
})
```