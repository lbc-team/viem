---
description: 从交易和签名中恢复签名地址。
---

# recoverTransactionAddress

从交易和签名中恢复原始签名地址。

## 用法

:::code-group

```ts twoslash [example.ts]
import { recoverTransactionAddress } from 'viem'
import { walletClient } from './client'

const request = await walletClient.prepareTransactionRequest({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})

const serializedTransaction = await walletClient.signTransaction(request)

const address = await recoverTransactionAddress({ // [!code focus:99]
  serializedTransaction,
})
```

```ts [client.ts (JSON-RPC 账户)]
import { createWalletClient, custom } from 'viem'

// 从 EIP-1193 提供者检索账户。
const [account] = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
})

export const walletClient = createWalletClient({
  account,
  transport: custom(window.ethereum!)
})
```

```ts twoslash [config.ts (本地账户)] filename="client.ts"
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'),
  transport: http()
})
```

:::

## 返回

[`Address`](/docs/glossary/types#address)

签名地址。

## 参数

### serializedTransaction

- **类型:** `TransactionSerialized`

RLP 序列化的交易。

### signature（可选）

- **类型:** `Signature | Hex | ByteArray`
- **默认值:** 在 `serializedTransaction` 上推断的签名（如果存在）

签名。