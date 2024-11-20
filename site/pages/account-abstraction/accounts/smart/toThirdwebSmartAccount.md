# Thirdweb 智能账户

:::warning
**注意：** 此实现由 [permissionless.js](https://docs.pimlico.io/permissionless) 维护和分发。
:::

要实现 [Thirdweb 智能账户](https://portal.thirdweb.com/)，你可以使用来自 [permissionless.js](https://docs.pimlico.io/permissionless/) 的 [`toThirdwebSmartAccount`](https://github.com/pimlicolabs/permissionless.js/blob/main/packages/permissionless/accounts/thirdweb/toThirdwebSmartAccount.ts) 模块。

## 安装

:::code-group
```bash [pnpm]
pnpm add permissionless
```

```bash [npm]
npm install permissionless
```

```bash [yarn]
yarn add permissionless
```

```bash [bun]
bun add permissionless
```
:::

## 用法

:::code-group

```ts twoslash [example.ts]
import { toThirdwebSmartAccount } from 'permissionless/accounts' // [!code focus]
import { client } from './client.js'
import { owner } from './owner.js'

const account = await toThirdwebSmartAccount({ // [!code focus]
  client, // [!code focus]
  owner, // [!code focus]
}) // [!code focus]
```

```ts twoslash [client.ts] filename="config.ts"
import { http, createPublicClient } from 'viem'
import { mainnet } from 'viem/chains'
 
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

```ts twoslash [owner.ts (私钥)] filename="owner.ts"
import { privateKeyToAccount } from 'viem/accounts'
 
export const owner = privateKeyToAccount('0x...')
```
:::

## 返回值

`SmartAccount<ThirdwebSmartAccountImplementation>`

## 参数

[查看参数](https://github.com/pimlicolabs/permissionless.js/blob/d5bb008969c23183f02c16f86f71f051cceb8ee3/packages/permissionless/accounts/thirdweb/toThirdwebSmartAccount.ts#L46-L64)