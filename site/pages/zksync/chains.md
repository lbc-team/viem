# 链

以下 ZKsync 链在 Viem 中受支持：

```ts twoslash
import {
  zksync, // [!code hl]
  zksyncSepoliaTestnet, // [!code hl]
} from 'viem/chains'
```

## 配置

Viem 通过 `chainConfig` 导出 ZKsync 的链 [格式化器](/docs/chains/formatters) 和 [序列化器](/docs/chains/serializers)。这在你需要定义另一个在 ZKsync 上实现的链时非常有用。

```ts twoslash
// @noErrors
import { defineChain } from 'viem'
import { chainConfig } from 'viem/zksync'

export const zkStackExample = defineChain({
  ...chainConfig,
  name: 'ZKsync Example',
  // ...
})
```