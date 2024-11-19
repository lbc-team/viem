# extractChain

通过 ID 从一组链中提取类型安全的链。

## 用法

```ts
import { extractChain } from 'viem'
import { mainnet, base, optimism, zora } from 'viem/chains'

const optimism = extractChain({
  chains: [mainnet, base, optimism, zora],
  id: 10,
})

optimism.id
//       ^? (property) id: 10
optimism.name
//       ^? (property) name: "OP Mainnet"
```

也可以使用来自 `viem/chains` 模块的 **所有链**：

```ts
import { extractChain } from 'viem'
import { mainnet, base, optimism, zora } from 'viem/chains' // [!code --]
import * as chains from 'viem/chains' // [!code ++]

const optimism = extractChain({
  chains: [mainnet, base, optimism, zora], // [!code --]
  chains: Object.values(chains), // [!code ++]
  id: 10,
})

optimism.id
//       ^? (property) id: 10
optimism.name
//       ^? (property) name: "OP Mainnet"
```

:::warning
通过从 `viem/chains` 导入所有链，这将显著增加你的包的大小。仅建议在包大小不是问题的情况下使用此方法（例如：服务器端、脚本等）。
:::

## 返回

- **类型：** `Chain`（推断）

提取的链。

## 参数

### chains

- **类型：** `readonly Chain[]`

将从中提取链的链集。

### id

- **类型：** `number`

要提取的链的 ID。