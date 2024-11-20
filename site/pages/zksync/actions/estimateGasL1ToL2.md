---
description: 返回 L1 到 L2 执行的估算 gas。
---

# estimateGasL1ToL2

返回 L1 到 L2 执行的估算 gas

## 用法

:::code-group
```ts [example.ts]
import { client } from './config'

const gas = await client.estimateGasL1ToL2({
  account: '0x636A122e48079f750d44d13E5b39804227E1467e',
  to: '0xa61464658AfeAf65CccaaFD3a512b69A83B77618',
  value: 0n
});
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { zksync } from 'viem/chains'
import { publicActionsL2 } from 'viem/zksync'

export const client = createPublicClient({
  chain: zksync,
  transport: http(),
}).extend(publicActionsL2())
```
:::

## 返回 

`bigint`

估算的 gas 值。

## 参数

### account

- **类型:** `Account | Address`

发送交易的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### to

- **类型:** `0x${string}`

交易接收者或合约地址。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
  value: 1000000000000000000n,
  nonce: 69
})
```

### data（可选）

- **类型:** `0x${string}`

带有编码参数的合约哈希方法调用。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### gasPrice（可选）

- **类型:** `bigint`

每个 gas 的价格（以 wei 为单位）。仅适用于 [传统交易](/docs/glossary/terms#legacy-transaction)。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account,
  gasPrice: parseGwei('20'), // [!code focus]
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})
```

### nonce（可选）

- **类型:** `number`

唯一编号，用于标识此交易。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
  nonce: 69 // [!code focus]
})
```

### value（可选）

- **类型:** `bigint`

与此交易一起发送的 wei 值。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'), // [!code focus]
  nonce: 69
})
```

### gasPerPubdata（可选）

- **类型:** `bigint`

在以太坊上发布一个字节数据所需的 gas 数量。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  gasPerPubdata: 50000, // [!code focus]
  nonce: 69,
  value: 1000000000000000000n
})
```

### factoryDeps（可选）

- **类型:** `[0x${string}]`

包含已部署合约的字节码。

```ts
const gas = await walletClient.estimateGasL1ToL2({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  factoryDeps: ['0xcde...'], // [!code focus]
  nonce: 69,
  value: 1000000000000000000n
})
```

### paymaster（可选）

- **类型:** `Account | Address`

将支付 gas 的支付者账户地址。此字段需要与 `paymasterInput` 一起使用。

```ts
const gas = await walletClient.estimateGasL1ToL2({
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
const gas = await walletClient.estimateGasL1ToL2({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  paymaster: '0x4B5DF730c2e6b28E17013A1485E5d9BC41Efe021', // [!code focus]
  paymasterInput: '0x8c5a...' // [!code focus]
  nonce: 69,
  value: 1000000000000000000n
})
```