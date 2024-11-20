---
outline: deep
description: 在 L1 上发起存款交易，该交易在 L2 上执行。
---

# depositTransaction

在 L1 上发起一个 [存款交易](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md)，该交易在 L2 上执行。

内部执行对 [Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 中 [`depositTransaction` 函数](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol#L378) 的合约写入。

## 使用方法

:::code-group

```ts [example.ts]
import { base } from 'viem/chains'
import { account, walletClientL1 } from './config'
 
const hash = await walletClientL1.depositTransaction({
  account,
  request: {
    gas: 21_000n,
    mint: parseEther('1'),
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  },
  targetChain: base,
})
```

```ts [config.ts]
import { createWalletClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

// JSON-RPC 账户
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::


:::warning

在调用此函数之前，你必须在 L2 上 [构建参数](#building-parameters)。如果 gas 过低，交易执行将在 L2 上失败。

:::

### 构建参数

[`buildDepositTransaction` 操作](/op-stack/actions/buildDepositTransaction) 构建并准备存款交易参数（即 `gas`、`targetChain` 等）。

我们可以使用生成的 `args` 在 L1 上发起存款交易。

:::code-group

```ts [example.ts]
import { account, publicClientL2, walletClientL1 } from './config'

// 为 L2 上的交易构建参数。
const args = await publicClientL2.buildDepositTransaction({
  account,
  mint: parseEther('1'),
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
 
// 在 L1 上执行存款交易。
const hash = await walletClientL1.depositTransaction(args)
```

```ts [config.ts]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())

// JSON-RPC 账户
export const [account] = await clientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

[查看更多关于 `buildDepositTransaction` 操作的信息。](/op-stack/actions/buildDepositTransaction)


### 账户提升

如果你不希望在每个 `depositTransaction` 中传递 `account`，你也可以在钱包客户端上提升账户（参见 `config.ts`）。

[了解更多。](/docs/clients/wallet#account)

:::code-group

```ts [example.ts]
import { publicClientL2, walletClientL1 } from './config'

// 为 L2 上的存款交易准备参数。
const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1'),
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
 
// 在 L1 上发起存款交易。
const hash = await walletClientL1.depositTransaction(args)
```

```ts [config.ts (JSON-RPC 账户)]
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

// 从 EIP-1193 提供者检索账户。 // [!code hl]
const [account] = await window.ethereum.request({ // [!code hl]
  method: 'eth_requestAccounts' // [!code hl]
}) // [!code hl]

export const walletClientL1 = createWalletClient({
  account, // [!code hl]
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())
```

```ts [config.ts (本地账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet, base } from 'viem/chains'
import { publicActionsL2, walletActionsL1 } from 'viem/op-stack'

export const walletClientL1 = createWalletClient({
  account: privateKeyToAccount('0x...'), // [!code hl]
  transport: custom(window.ethereum)
}).extend(walletActionsL1())

export const publicClientL2 = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())
```

:::

## 返回值

[`Hash`](/docs/glossary/types#hash)

[L1 交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### account

- **类型:** `Account | Address`

要发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const hash = await client.depositTransaction({
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

合约部署字节码或编码的合约方法及参数。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    data: '0x...', // [!code focus]
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  targetChain: base,
})
```

### args.gas

- **类型:** `bigint`

L2 上交易执行的 gas 限制。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n, // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  },
  targetChain: base,
})
```

### args.isCreation (可选)

- **类型:** `boolean`

这是否是合约部署交易。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    data: '0x...',
    gas: 69_420n,
    isCreation: true // [!code focus]
  },
  targetChain: base,
})
```

### args.mint (可选)

- **类型:** `bigint`

在 L2 上铸造（存款）的 wei 值。从调用者的 L1 余额中扣除。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    mint: parseEther('1') // [!code focus]
  },
  targetChain: base,
})
```

### args.to (可选)

- **类型:** `Address`

L2 交易接收者。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',  // [!code focus]
    value: parseEther('1')
  },
  targetChain: base,
})
```

### args.value (可选)

- **类型:** `bigint`

在 L2 上与此交易一起发送的 wei 值。从调用者的 L2 余额中扣除。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1') // [!code focus]
  },
  targetChain: base,
})
```

### targetChain

- **类型:** [`Chain`](/docs/glossary/types#chain)

执行交易的 L2 链。

```ts
import { mainnet } from 'viem/chains'

const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  chain: mainnet,
  targetChain: base, // [!code focus]
})
```

### chain (可选)

- **类型:** [`Chain`](/docs/glossary/types#chain)
- **默认:** `client.chain`

L1 链。如果钱包的当前链与此链不匹配，将抛出错误。

```ts
import { mainnet } from 'viem/chains'

const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  chain: mainnet, // [!code focus]
  targetChain: base,
})
```

### maxFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  maxFeePerGas: parseGwei('20'),  // [!code focus]
  targetChain: base,
})
```

### maxPriorityFeePerGas (可选)

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  maxFeePerGas: parseGwei('20'), 
  maxPriorityFeePerGas: parseGwei('2'),  // [!code focus]
  targetChain: base,
})
```

### nonce (可选)

- **类型:** `number`

唯一标识此交易的数字。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  nonce: 69, // [!code focus]
  targetChain: base,
})
```

### portalAddress (可选)

- **类型:** `Address`
- **默认:** `targetChain.contracts.portal[chainId].address`

[Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 的地址。默认为在 `targetChain` 上指定的 Optimism Portal 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const hash = await client.depositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```