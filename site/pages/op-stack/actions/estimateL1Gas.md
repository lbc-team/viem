---
description: 估算执行 L2 交易所需的 L1 gas 量
---

# estimateL1Gas

估算执行 L2 交易所需的 [L1 数据 gas](https://docs.optimism.io/stack/transactions/fees#l1-data-fee) 量。

调用 [Gas Price Oracle](https://github.com/ethereum-optimism/optimism/blob/233ede59d16cb01bdd8e7ff662a153a4c3178bdd/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) 预部署合约上的 `getL1GasUsed` 方法。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'

const gas = await publicClient.estimateL1Gas({ // [!code focus:7]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base } from 'viem/chains'
import { publicActionsL2 } from 'viem/op-stack'

// JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)

export const publicClient = createPublicClient({
  chain: base,
  transport: http()
}).extend(publicActionsL2())
```

:::

## 返回值

`bigint`

L1 数据 gas 估算值。

## 参数

### account

- **类型:** `Account | Address`

用于估算 gas 的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const gas = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### data（可选）

- **类型:** `0x${string}`

合约代码或带有编码参数的哈希方法调用。

```ts
const gas = await publicClient.estimateL1Gas({
  data: '0x...', // [!code focus]
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### gasPriceOracleAddress（可选）

- **类型:** [`Address`](/docs/glossary/types#address)

Gas Price Oracle 预部署合约的地址。

```ts
const gas = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  gasPriceOracleAddress: '0x420000000000000000000000000000000000000F', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### maxFeePerGas（可选）

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。

```ts
const gas = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'),  // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### maxPriorityFeePerGas（可选）

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。

```ts
const gas = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### nonce（可选）

- **类型:** `number`

唯一标识此交易的数字。

```ts
const fee = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  maxFeePerGas: parseGwei('20'),
  maxPriorityFeePerGas: parseGwei('2'),
  nonce: 69, // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1')
})
```

### to（可选）

- **类型:** [`Address`](/docs/glossary/types#address)

交易接收者。

```ts
const gas = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
  value: parseEther('1')
})
```

### value（可选）

- **类型:** `bigint`

与此交易一起发送的值（以 wei 为单位）。

```ts
const gas = await publicClient.estimateL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1') // [!code focus]
})
```