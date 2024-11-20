---
description: 在合约上执行写入函数，支持 EIP712 交易。
---

# writeContract

在合约上执行写入函数，支持 EIP712 交易。

## 用法

:::code-group

```ts [example.ts]
import { account, walletClient } from './config'

const hash = await walletClient.writeContract({ // [!code focus:99]
  account,
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
})
// '0x...'
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { zksync } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync'

export const walletClient = createWalletClient({
  chain: zksync,
  transport: custom(window.ethereum)
}).extend(eip712WalletActions())

// JSON-RPC 账户
export const [account] = await walletClient.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

### 账户提升

如果你不希望在每个 `sendTransaction` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts [example.ts]
import { walletClient } from './config'
 
const hash = await walletClient.writeContract({ // [!code focus:99]
  account,
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
})
// '0x...'
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, custom } from 'viem'
import { eip712WalletActions } from 'viem/zksync'

// 从 EIP-712 提供者检索账户。 // [!code focus]
const [account] = await window.ethereum.request({  // [!code focus]
  method: 'eth_requestAccounts' // [!code focus]
}) // [!code focus]

export const walletClient = createWalletClient({
  account,
  transport: custom(window.ethereum) // [!code focus]
}).extend(eip712WalletActions())
```

```ts [config.ts (本地账户)]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { eip712WalletActions } from 'viem/zksync'

export const walletClient = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code focus]
  transport: custom(window.ethereum)
}).extend(eip712WalletActions())
```

:::

## 返回

[`Hash`](/docs/glossary/types#hash)

[交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
```

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  functionName: 'mint',
  args: [69420]
})
```

### functionName

- **类型:** `string`

要从 ABI 中提取的函数。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint', // [!code focus]
  args: [69420]
})
```

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
```

### accessList (可选)

- **类型:** [`AccessList`](/docs/glossary/types#accesslist)

访问列表。

```ts
const hash = await walletClient.writeContract({
  accessList: [ // [!code focus:6]
    {
      address: '0x1',
      storageKeys: ['0x1'],
    },
  ],
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
```

### chain (可选)

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `walletClient.chain`

目标链。如果钱包的当前链与目标链不匹配，将抛出错误。

```ts
import { zksync } from 'viem/chains' // [!code focus]

const hash = await walletClient.writeContract({
  chain: zksync, // [!code focus]
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
```

### data (可选)

- **类型:** `0x${string}`

带有编码参数的合约哈希方法调用。

```ts
const hash = await walletClient.writeContract({
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420]
})
```

### gasPrice (可选)

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  gasPrice: parseGwei('20'), // [!code focus]
})
```

### nonce (可选)

- **类型:** `number`

唯一编号，用于标识此交易。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  nonce: 69 // [!code focus]
})
```

### value (可选)

- **类型:** `bigint`

与此交易一起发送的 wei 值。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  value: parseEther('1'), // [!code focus]
})
```

### gasPerPubdata (可选)

- **类型:** `bigint`

在以太坊上发布一个字节数据所需的 gas 量。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  gasPerPubdata: 50000, // [!code focus]
})
```

### factoryDeps (可选)

- **类型:** `[0x${string}]`

包含已部署合约的字节码。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  factoryDeps: ['0xcde...'], // [!code focus]
})
```

### paymaster (可选)

- **类型:** `Account | Address`

将支付费用的支付者账户地址。此字段需要 `paymasterInput`。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
})
```

### paymasterInput (可选)

- **类型:** `0x${string}`

支付者的输入数据。此字段需要 `paymaster`。

```ts
const hash = await walletClient.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  args: [69420],
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
})
```