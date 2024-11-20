---
outline: deep
description: 构建并准备在 L1 上发起并在 L2 上执行的存款交易的参数。
---

# buildDepositTransaction

构建并准备参数以发起在 L1 上的 [存款交易](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) 并在 L2 上执行。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClientL2, walletClientL1 } from './config'

const args = await publicClientL2.buildDepositTransaction({ // [!code hl]
  account, // [!code hl]
  mint: parseEther('1'), // [!code hl]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code hl]
}) // [!code hl]
 
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
export const [account] = await walletClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::


### 账户提升

如果你不希望在每个 `buildDepositTransaction` 中传递 `account`，你也可以在钱包客户端上提升账户（请参见 `config.ts`）。

[了解更多](/docs/clients/wallet#account)。

:::code-group

```ts [example.ts]
import { publicClientL2, walletClientL1 } from './config'

const args = await publicClientL2.buildDepositTransaction({
  mint: parseEther('1')
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
 
const hash = await walletClientL1.depositTransaction(args)
```

```ts [config.ts (JSON-RPC 账户)]
import { createPublicClient, createWalletClient, custom, http } from 'viem'
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

## 返回

`DepositTransactionParameters`

执行 [存款交易](/op-stack/actions/depositTransaction) 所需的参数。

## 参数

### account (可选)

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const args = await client.buildDepositTransaction({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### data (可选)

- **类型:** `Hex`

合约部署字节码或编码的合约方法和参数。

```ts
const args = await client.buildDepositTransaction({
  data: '0x...', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
})
```

### gas (可选)

- **类型:** `bigint`

在 L2 上执行交易的 gas 限制。

```ts
const args = await client.buildDepositTransaction({
  gas: 21_000n, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### isCreation (可选)

- **类型:** `boolean`

这是否是合约部署交易。

```ts
const args = await client.buildDepositTransaction({
  data: '0x...',
  isCreation: true // [!code focus]
})
```

### mint (可选)

- **类型:** `bigint`

在 L2 上铸造（存款）的 wei 值。从调用者的 L1 余额中扣除。

```ts
const args = await client.buildDepositTransaction({
  mint: parseEther('1') // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
})
```

### to (可选)

- **类型:** `Address`

L2 交易接收者。

```ts
const args = await client.buildDepositTransaction({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',  // [!code focus]
  value: parseEther('1')
})
```

### value (可选)

- **类型:** `bigint`

与此交易一起发送的 wei 值。在调用者的 L2 余额中扣除。

```ts
const args = await client.buildDepositTransaction({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
  value: parseEther('1') // [!code focus]
})
```