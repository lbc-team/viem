---
description: 获取合约在 L1 上持有的代币余额。
---

# getL1TokenBalance

获取合约在 L1 上持有的代币余额。

## 用法

:::code-group

```ts [example.ts]
import { account, publicClient } from './config'

const balance = await publicClient.getL1TokenBalance({
  account
  token: '0x5C221E77624690fff6dd741493D735a17716c26B',
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

## 返回

`bigint`

返回代币的数量。

## 参数

### account

- **类型:** `Account | Address`

用于检查的账户。

接受 [JSON-RPC 账户](/docs/clients/wallet#json-rpc-accounts) 或 [本地账户（私钥等）](/docs/clients/wallet#local-accounts-private-key-mnemonic-etc)。

```ts
const balance = await publicClient.getL1TokenBalance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' // [!code focus]
  blockTag: 'latest',
  token: '0x5C221E77624690fff6dd741493D735a17716c26B',
})
```

### blockTag（可选）

- **类型:** `BlockTag | undefined`

应在哪个区块上检查余额。默认选项是最新处理的区块。

```ts
const balance = await publicClient.getL1TokenBalance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  blockTag: 'latest', // [!code focus]
  token: '0x5C221E77624690fff6dd741493D735a17716c26B',
})
```

### token

- **类型:** `Address`

代币的地址。

```ts
const balance = await publicClient.getL1TokenBalance({
  account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  blockTag: 'latest',
  token: '0x5C221E77624690fff6dd741493D735a17716c26B', // [!code focus]
})
```