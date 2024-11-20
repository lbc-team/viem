---
description: 使用 EIP712 交易将字节码和构造函数参数部署到网络上。
---

# deployContract

使用 EIP712 交易将字节码和构造函数参数部署到网络上。

## 用法

:::code-group

```ts [example.ts]
import { wagmiAbi } from './abi'
import { account, walletClient } from './config'

const hash = await walletClient.deployContract({
  abi,
  account,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  ...
] as const;
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { zksync } from 'viem/chains'
import { eip712Actions } from 'viem/zksync'

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

### 使用构造函数参数进行部署

:::code-group

```ts [example.ts] {8}
import { deployContract } from 'viem'
import { wagmiAbi } from './abi'
import { account, walletClient } from './config'

const hash = await walletClient.deployContract({
  abi,
  account,
  args: [69420],
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
})
```

```ts [abi.ts] {4}
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "x", type: "uint32" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  ...
] as const;
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { zksync } from 'viem/chains'
import { eip712Actions } from 'viem/zksync'

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

### 使用工厂依赖进行部署

:::code-group

```ts [example.ts] {8}
import { deployContract } from 'viem'
import { wagmiAbi } from './abi'
import { account, walletClient } from './config'

const hash = await walletClient.deployContract({
  abi,
  account,
  args: [69420],
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  factoryDeps: [
    '0x702040405260405161083e38038061083e833981016040819123456...', 
    '0x102030405260405161083e38038061083e833981016040819112233...'
  ]
})
```

```ts [abi.ts] {4}
export const wagmiAbi = [
  ...
  {
    inputs: [{ name: "x", type: "uint32" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  ...
] as const;
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { zksync } from 'viem/chains'
import { eip712Actions } from 'viem/zksync'

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

## 返回

[`Hash`](/docs/glossary/types#hash)

[交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi, // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
})
```

### account

- **类型:** `Account | Address`

要从中部署合约的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi, 
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
})
```

### bytecode

- **类型:** [`Hex`](/docs/glossary/types#hex)

合约的字节码。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi,
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', // [!code focus]
})
```

### args

- **类型:** 从 ABI 推断。

部署时调用的构造函数参数。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi,
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: [69] // [!code focus]
})
```

### deploymentType（可选）

- **类型:** `'create' | 'create2' | 'createAccount' | 'create2Account'`

指定合约部署的类型。默认为 'create'。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi,
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: [69],
  deploymentType: 'create2' // [!code focus]
})
```

### salt（可选）

- **类型:** [`Hash`](/docs/glossary/types#hash)

指定合约部署的唯一标识符。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi,
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: [69],
  salt: '0x201050...' // [!code focus]
})
```

### gasPerPubdata（可选）

- **类型:** `bigint`

在以太坊上发布一个字节数据所需的 gas 量。

```ts
const hash = await walletClient.sendTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  gasPerPubdata: 50000, // [!code focus]
  nonce: 69,
  value: 1000000000000000000n
})
```

### paymaster（可选）

- **类型:** `Account | Address`

将支付费用的支付者账户地址。此字段需要与 `paymasterInput` 一起使用。

```ts
const hash = await walletClient.sendTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
  nonce: 69,
  value: 1000000000000000000n
})
```

### paymasterInput（可选）

- **类型:** `0x${string}`

支付者的输入数据。此字段需要与 `paymaster` 一起使用。

```ts
const hash = await walletClient.sendTransaction({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
  nonce: 69,
  value: 1000000000000000000n
})
```