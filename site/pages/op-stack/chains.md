# 链

以下 Viem 链在 OP Stack 上实现：

```ts
import {
  base, // [!code hl]
  baseGoerli, // [!code hl]
  baseSepolia, // [!code hl]
  fraxtal, // [!code hl]
  fraxtalTestnet, // [!code hl]
  inkSepolia, // [!code hl]
  optimism, // [!code hl]
  optimismGoerli, // [!code hl]
  optimismSepolia, // [!code hl]
  soneiumMinato, // [!code hl]
  zora, // [!code hl]
  zoraSepolia, // [!code hl]
  zoraTestnet, // [!code hl]
} from 'viem/chains'
```

## 配置

Viem 通过 `chainConfig` 导出 OP Stack 的链 [格式化器](/docs/chains/formatters) 和 [序列化器](/docs/chains/serializers)。如果你需要定义另一个在 OP Stack 上实现的链，这非常有用。

```ts
import { defineChain } from 'viem'
import { chainConfig } from 'viem/op-stack'

export const opStackExample = defineChain({
  ...chainConfig,
  name: 'OP Stack 示例',
  // ...
})
```