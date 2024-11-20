---
description: 估算执行 L2 合约写入所需的 L1 gas。
---

# estimateContractL1Gas

估算执行 L2 合约写入所需的 [L1 数据 gas](https://docs.optimism.io/stack/transactions/fees#l1-data-fee)。

调用 [Gas Price Oracle](https://github.com/ethereum-optimism/optimism/blob/233ede59d16cb01bdd8e7ff662a153a4c3178bdd/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) 预部署合约上的 `getL1GasUsed` 方法。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'
import { wagmiAbi } from './abi'

const l1Fee = await publicClient.estimateContractL1Gas({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  account,
})
```

```ts [abi.ts]
export const wagmiAbi = [
  ...
  {
    inputs: [],
    name: "mint",
    outputs: [{ name: "", type: "uint32" }],
    stateMutability: "view",
    type: "function",
  },
  ...
] as const;
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
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
})
```

### abi

- **类型:** [`Abi`](/docs/glossary/types#abi)

合约的 ABI。

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi, // [!code focus]
  functionName: 'mint',
})
```

### address

- **类型:** [`Address`](/docs/glossary/types#address)

合约地址。

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code focus]
  abi: wagmiAbi,
  functionName: 'mint',
})
```

### functionName

- **类型:** `string`

要从 ABI 中提取的函数。

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint', // [!code focus]
})
```

### args（可选）

- **类型:** 从 ABI 推断。

传递给函数调用的参数。

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: wagmiAbi,
  functionName: 'balanceOf',
  args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'], // [!code focus]
})
```

### gasPriceOracleAddress（可选）

- **类型:** [`Address`](/docs/glossary/types#address)

Gas Price Oracle 预部署合约的地址。

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  gasPriceOracleAddress: '0x420000000000000000000000000000000000000F', // [!code focus]
})
```

### maxFeePerGas（可选）

- **类型:** `bigint`

每个 gas 的总费用（以 wei 为单位），包括 `maxPriorityFeePerGas`。 

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  maxFeePerGas: parseGwei('20'),  // [!code focus]
})
```

### maxPriorityFeePerGas（可选）

- **类型:** `bigint`

每个 gas 的最大优先费用（以 wei 为单位）。 

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  maxPriorityFeePerGas: parseGwei('2'), // [!code focus]
})
```

### nonce（可选）

- **类型:** `number`

唯一标识此交易的数字。

```ts
const { result } = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  nonce: 69, // [!code focus]
})
```

### value（可选）

- **类型:** `bigint`

与此交易一起发送的值（以 wei 为单位）。

```ts
const gas = await publicClient.estimateContractL1Gas({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: wagmiAbi,
  functionName: 'mint',
  value: parseEther('1') // [!code focus]
})
```