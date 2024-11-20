---
outline: deep
description: 估算从 L2 到 L1 发起提款所需的 gas。
---

# estimateInitiateWithdrawalGas

估算从 L2 到 L1 发起一个 [提款](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) 所需的 gas。

## 使用方法

:::code-group

```ts [example.ts]
import { base } from 'viem/chains'
import { account, publicClientL2 } from './config'
 
const gas = await publicClientL2.estimateInitiateWithdrawalGas({
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
import { publicActionsL2 } from 'viem/op-stack'

export const publicClientL2 = createPublicClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(publicActionsL2())

// JSON-RPC 账户
export const [account] = await walletClientL2.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

## 返回值

`bigint`

估算的发起提款所需的 gas。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const gas = await client.estimateInitiateWithdrawalGas({
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

编码的合约方法及参数。

```ts
const gas = await client.estimateInitiateWithdrawalGas({
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
const gas = await client.estimateInitiateWithdrawalGas({
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
const gas = await client.estimateInitiateWithdrawalGas({
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
const gas = await client.estimateInitiateWithdrawalGas({
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
- **默认值:** `client.chain`

L2 链。如果钱包的当前链与此链不匹配，将抛出错误。

```ts
import { optimism } from 'viem/chains'

const gas = await client.estimateInitiateWithdrawalGas({
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

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。

```ts
const gas = await client.estimateInitiateWithdrawalGas({
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

每个 gas 的最大优先费用（以 wei 为单位）。仅适用于 [EIP-1559 交易](/docs/glossary/terms#eip-1559-transaction)

```ts
const gas = await client.estimateInitiateWithdrawalGas({
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

唯一标识此交易的数字。

```ts
const gas = await client.estimateInitiateWithdrawalGas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  nonce: 69, // [!code focus]
})
```