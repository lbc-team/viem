---
outline: deep
description: 估算在 L1 上发起存款交易所需的 gas，该交易在 L2 上执行。
---

# estimateDepositTransactionGas

估算在 L1 上发起一个 [存款交易](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md)，该交易在 L2 上执行。

## 用法

:::code-group

```ts [example.ts]
import { base } from 'viem/chains'
import { account, publicClientL1 } from './config'
 
const gas = await publicClientL1.estimateDepositTransactionGas({
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
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { publicActionsL1 } from 'viem/op-stack'

export const publicClientL1 = createPublicClient({
  chain: mainnet,
  transport: http()
}).extend(publicActionsL1())

// JSON-RPC 账户
export const [account] = await publicClientL1.getAddresses()
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

## 返回值

`bigint`

在 L1 上执行交易所需的 gas。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const gas = await client.estimateDepositTransactionGas({
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
const gas = await client.estimateDepositTransactionGas({
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

在 L2 上执行交易的 gas 限制。

```ts
const gas = await client.estimateDepositTransactionGas({
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

这是否是一个合约部署交易。

```ts
const gas = await client.estimateDepositTransactionGas({
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
const gas = await client.estimateDepositTransactionGas({
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
const gas = await client.estimateDepositTransactionGas({
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

与此交易一起发送的 wei 值。在调用者的 L2 余额中扣除。

```ts
const gas = await client.estimateDepositTransactionGas({
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

在其上执行交易的 L2 链。

```ts
import { mainnet } from 'viem/chains'

const gas = await client.estimateDepositTransactionGas({
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
- **默认值:** `client.chain`

L1 链。如果钱包的当前链与此链不匹配，将抛出错误。

```ts
import { mainnet } from 'viem/chains'

const gas = await client.estimateDepositTransactionGas({
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
const gas = await client.estimateDepositTransactionGas({
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
const gas = await client.estimateDepositTransactionGas({
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

唯一编号，用于标识此交易。

```ts
const gas = await client.estimateDepositTransactionGas({
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
- **默认值:** `targetChain.contracts.portal[chainId].address`

[Optimism Portal 合约](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts-bedrock/src/L1/OptimismPortal.sol) 的地址。默认为在 `targetChain` 上指定的 Optimism Portal 合约。

如果提供了 `portalAddress`，则 `targetChain` 参数变为可选。

```ts
const gas = await client.estimateDepositTransactionGas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  request: {
    gas: 21_000n,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', 
    value: parseEther('1')
  },
  portalAddress: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed' // [!code focus]
})
```