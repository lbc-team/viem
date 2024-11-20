---
description: 确定特定 L1 桥的批准代币数量。
---

# getL1Allowance

确定特定 L1 桥的批准代币数量。

## 使用方法

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'

const allowance = await publicClient.getL1Allowance({
  account,
  token: '0x5C221E77624690fff6dd741493D735a17716c26B',
  bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
})
```

```ts [config.ts]
import { createPublicClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { publicActionsL1 } from 'viem/zksync'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: custom(window.ethereum)
}).extend(publicActionsL1())

// JSON-RPC 账户
export const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
// 本地账户
export const account = privateKeyToAccount(...)
```

:::

## 返回值

`bigint`

返回批准的代币数量。

## 参数

### account

- **类型:** `Account | Address`

用于检查的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const allowance = await publicClient.getL1Allowance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
  blockTag: 'latest',
  bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
  token: '0x5C221E77624690fff6dd741493D735a17716c26B',
})
```

### blockTag（可选）

- **类型:** `BlockTag | undefined`

应在哪个区块上检查批准。默认选项是最新处理的区块。

```ts
const allowance = await publicClient.getL1Allowance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  blockTag: 'latest', // [!code focus]
  bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
  token: '0x5C221E77624690fff6dd741493D735a17716c26B',
})
```

### bridgeAddress

- **类型:** `Address`

要使用的桥合约地址。

```ts
const allowance = await publicClient.getL1Allowance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  blockTag: 'latest', 
  bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D', // [!code focus]
  token: '0x5C221E77624690fff6dd741493D735a17716c26B', 
})
```

### token

- **类型:** `Address`

代币的以太坊地址。

```ts
const allowance = await publicClient.getL1Allowance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  blockTag: 'latest',
  bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
  token: '0x5C221E77624690fff6dd741493D735a17716c26B', // [!code focus]
})
```