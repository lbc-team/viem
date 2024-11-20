# Kernel (ZeroDev) 智能账户

:::warning
**注意：** 此实现由 [permissionless.js](https://docs.pimlico.io/permissionless) 维护和分发。
:::

要实现 [Kernel (ZeroDev) 智能账户](https://github.com/zerodevapp/kernel)，你可以使用来自 [permissionless.js](https://docs.pimlico.io/permissionless/) 的 [`toEcdsaKernelSmartAccount`](https://docs.pimlico.io/permissionless/reference/accounts/toEcdsaKernelSmartAccount) 模块。

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
import { toEcdsaKernelSmartAccount } from 'permissionless/accounts' // [!code focus]
import { client } from './client.js'
import { owner } from './owner.js'

const account = await toEcdsaKernelSmartAccount({ // [!code focus]
  client, // [!code focus]
  owners: [owner], // [!code focus]
  version: '0.3.1', // [!code focus]
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

`SmartAccount<EcdsaKernelSmartAccountImplementation>`

## 参数

[查看参数](https://docs.pimlico.io/permissionless/reference/accounts/toEcdsaKernelSmartAccount#parameters)