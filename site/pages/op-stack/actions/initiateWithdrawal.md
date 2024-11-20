---
outline: deep
description: 在 L2 上发起到 L1 的提款。
---

# initiateWithdrawal

在 L2 上发起一个 [提款](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) 到 L1。

内部执行对 [`initiateWithdrawal` 函数](https://github.com/ethereum-optimism/optimism/blob/283f0aa2e3358ced30ff7cbd4028c0c0c3faa140/packages/contracts-bedrock/src/L2/L2ToL1MessagePasser.sol#L73) 的合约写入，位于 [Optimism L2ToL1MessagePasser 预部署合约](https://github.com/ethereum-optimism/optimism/blob/283f0aa2e3358ced30ff7cbd4028c0c0c3faa140/packages/contracts-bedrock/src/L2/L2ToL1MessagePasser.sol)。

## 用法

:::code-group

```ts [example.ts]
import { base } from 'viem/chains'
import { account, walletClientL2 } from './config'
 
const hash = await walletClientL2.initiateWithdrawal({
  account,
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  },
})
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { walletActionsL2 } from 'viem/op-stack'

export const walletClientL2 = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL2.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::


:::warning

在调用此函数之前，你必须在 L1 上 [构建参数](#building-parameters)。如果 gas 过低，交易执行将在 L1 上失败。

:::

### 构建参数

[`buildInitiateWithdrawal` 操作](/op-stack/actions/buildInitiateWithdrawal) 构建并准备发起提款交易的参数。

我们可以使用生成的 `args` 在 L2 上发起提款交易。

:::code-group

```ts [example.ts]
import { account, publicClientL1, walletClientL2 } from './config'

const args = await publicClientL1.buildInitiateWithdrawal({ // [!code hl]
  account, // [!code hl]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code hl]
  value: parseEther('1'), // [!code hl]
}) // [!code hl]
 
const hash = await walletClientL2.initiateWithdrawal(args)
```

```ts [config.ts]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL2 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL2 = createWalletClient({
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

[查看更多关于 `buildInitiateWithdrawal` 操作的信息。](/op-stack/actions/buildInitiateWithdrawal)


### 账户提升

如果你不希望在每次 `proveWithdrawal` 中传递 `account`，你也可以在钱包客户端上提升账户（参见 `config.ts`）。

[了解更多。](/docs/clients/wallet#account)

:::code-group

```ts [example.ts]
import { account, publicClientL1, walletClientL2 } from './config'

const args = await publicClientL1.buildInitiateWithdrawal({ 
  account, // [!code --]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
  value: parseEther('1'), 
}) 
 
const hash = await walletClientL2.initiateWithdrawal(args)
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL2 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 // [!code hl]
const [account] = await window.ethereum.request({ // [!code hl]
  method: 'eth_requestAccounts' // [!code hl]
}) // [!code hl]

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL2 = createWalletClient({
  account, // [!code hl]
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, optimism } from 'viem/chains'
import { publicActionsL1, walletActionsL2 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

export const walletClientL2 = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code hl]
  chain: optimism,
  transport: custom(window.ethereum)
}).extend(walletActionsL2())
```

:::

## 返回

[`Hash`](/docs/glossary/types#hash)

[L2 交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  },
  targetChain: base,
})
```

### args.data (可选)

- **类型:** `Hex`

编码的合约方法和参数。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    data: '0x...', // [!code focus]
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
})
```

### args.gas

- **类型:** `bigint`

L1 上交易执行的 gas 限制。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n, // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  },
})
```

### args.to

- **类型:** `Address`

L1 交易接收者。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',  // [!code focus]
    value: parseEther('1')
  },
})
```

### args.value (可选)

- **类型:** `bigint`

从 L2 提取到 L1 的 wei 值。将从调用者的 L2 余额中扣除。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1') // [!code focus]
  },
})
```

### chain (可选)

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `client.chain`

L2 链。如果钱包的当前链与此链不匹配，将抛出错误。

```ts
import { optimism } from 'viem/chains'

const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  chain: optimism, // [!code focus]
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每单位 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  maxFeePerGas: parseGwei('20'),  // [!code focus]
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每单位 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  maxFeePerGas: parseGwei('20'), 
  maxPriorityFeePerGas: parseGwei('2'),  // [!code focus]
})
```

### nonce (可选)

- **类型:** `number`

唯一编号，用于标识此交易。

```ts
const hash = await client.initiateWithdrawal({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  nonce: 69, // [!code focus]
})
```