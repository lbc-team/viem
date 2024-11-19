---
description: 将合约部署到网络，给定字节码和构造函数参数。
---

# deployContract

将合约部署到网络，给定字节码和构造函数参数。

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

```ts [client.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

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

```ts [client.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

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

用于部署合约的账户。

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

### args（如果需要）

- **类型:** 从 ABI 推断。

在部署时调用的构造函数参数。

```ts
const hash = await walletClient.deployContract({
  abi: wagmiAbi,
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  args: [69] // [!code focus]
})
```

## 实时示例

查看 `deployContract` 在实时 [部署合约示例](https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_deploying-contracts) 中的用法。

<iframe frameBorder="0" width="100%" height="500px" src="https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_deploying-contracts?embed=1&file=index.ts&hideNavigation=1&hideDevTools=true&terminalHeight=0&ctl=1"></iframe>