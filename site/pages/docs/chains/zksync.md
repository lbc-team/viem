# ZKsync [在 Viem 中集成 ZKsync]

Viem 提供对在 [ZKsync](https://zksync.io/) 上实现的链的优质支持。

## 链

以下 Viem 链是在 ZKsync 上实现的：

```ts
import {
  zksync, // [!code hl]
  zksyncSepoliaTestnet, // [!code hl]
} from 'viem/chains'
```

### 配置

Viem 通过 `chainConfig` 导出 ZKsync 的链 [格式化器](/docs/chains/formatters) 和 [序列化器](/docs/chains/serializers)。如果你需要定义另一个在 ZKsync 上实现的链，这非常有用。

```ts
import { defineChain } from 'viem'
import { chainConfig } from 'viem/zksync'

export const zkSyncExample = defineChain({
  ...chainConfig,
  name: 'ZKsync 示例',
  // ...
})
```

## 工具

### `serializeTransaction`

序列化交易对象。支持 EIP-712、EIP-1559、EIP-2930 和传统交易。

ZKsync 版本的 [Viem 的 `serializeTransaction`](/docs/utilities/serializeTransaction)。

#### 参数

- `transaction` (`TransactionSerializable`): 要序列化的交易对象。
- `signature` (`Signature`): 可选的签名以包含。

```ts
import { serializeTransaction } from 'viem/zksync'

const serialized = serializeTransaction({
  chainId: 1,
  gas: 21001n,
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'),
  nonce: 69,
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021',
  paymasterInput:
    '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
  to: '0x1234512345123451234512345123451234512345',
  type: 'eip712',
  value: parseEther('0.01'),
})
```