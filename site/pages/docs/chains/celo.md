# Celo [在 Viem 中与 Celo 集成]

Viem 为在 [Celo](https://celo.org/) 上实现的链提供一流支持。

## 链

以下 Viem 链是在 Celo 上实现的：

```ts
import {
  celo, // [!code hl]
  celoAlfajores, // [!code hl]
} from 'viem/chains'
```

### 配置

Viem 通过 `chainConfig` 导出 Celo 的链 [格式化器](/docs/chains/formatters) 和 [序列化器](/docs/chains/serializers)。如果你需要定义另一个在 Celo 上实现的链，这非常有用。

```ts
import { defineChain } from 'viem'
import { chainConfig } from 'viem/celo'

export const celoExample = defineChain({
  ...chainConfig,
  name: 'Celo 示例',
  // ...
})
```

## 工具

### `parseTransaction`

解析序列化的 RLP 编码交易。支持签名和未签名的 CIP-64、EIP-1559、EIP-2930 和传统交易。

Celo 版本的 [Viem 的 `parseTransaction`](/docs/utilities/parseTransaction)。

#### 参数

- `serializedTransaction` (`Hex`): 序列化的交易。

```ts
import { parseTransaction } from 'viem/celo'

const transaction = parseTransaction('0x7cf84682a4ec80847735940084773594008094765de816845861e75a25fca122bb6898b8b1282a808094f39fd6e51aad88f6f4ce6ab8827279cfffb92266880de0b6b3a764000080c0')
```

### `serializeTransaction`

序列化交易对象。支持 CIP-64、EIP-1559、EIP-2930 和传统交易。

Celo 版本的 [Viem 的 `serializeTransaction`](/docs/utilities/serializeTransaction)。

#### 参数

- `transaction` (`TransactionSerializable`): 要序列化的交易对象。
- `signature` (`Signature`): 可选的签名以包含。

```ts
import { serializeTransaction } from 'viem/celo'

const serialized = serializeTransaction({
  chainId: 42220,
  gas: 21001n,
  feeCurrency: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B" // USDC 的白名单适配器
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'),
  nonce: 69,
  to: '0x1234512345123451234512345123451234512345',
  value: parseEther('0.01'),
})
```