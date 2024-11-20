# Solady 智能账户

`toSoladySmartAccount` 是一个简单的智能账户实现，引用了 [Solady 的 `ERC4337.sol`](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC4337.sol) 智能账户合约。

:::warning
此实现未经审计。它旨在用于测试目的或作为实现 [自定义账户](/account-abstraction/accounts/smart/toSmartAccount) 的参考。
:::

## 用法

:::code-group

```ts twoslash [example.ts]
import { toSoladySmartAccount } from 'viem/account-abstraction' // [!code focus]
import { client, owner } from './config.js'

const account = await toSoladySmartAccount({ // [!code focus]
  client, // [!code focus]
  owner, // [!code focus]
}) // [!code focus]
```

```ts twoslash [config.ts] filename="config.ts"
import { http, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const owner = privateKeyToAccount('0x...')
 
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

:::

## 返回值

`SmartAccount<SoladySmartAccountImplementation>`

## 参数

### entryPoint（可选）

- **类型：** `{ abi: Abi, address: Address, version: EntryPointVersion }`

智能账户引用的兼容 EntryPoint。EntryPoint 用于：

- 确定用户操作的目标 EntryPoint 地址
- 计算用户操作哈希
- 检索智能账户的 nonce
- 区分使用哪种类型的 `UserOperation` 结构

```ts
const account = await toSoladySmartAccount({
  client,
  entryPoint: { // [!code focus]
    abi: [/* ... */], // [!code focus]
    address: '0x0000000071727De22E5E9d8BAf0edAc6f37da032', // [!code focus]
    version: '0.7', // [!code focus]
  }, // [!code focus]
  owner,
})
```

### factoryAddress

- **类型：** `Address`

智能账户的工厂地址。

```ts
const account = await toSoladySmartAccount({
  client,
  factoryAddress: '0xda4b37208c41c4f6d1b101cac61e182fe1da0754', // [!code focus]
  owner,
})
```

### owner

- **类型：** `Address | Account`

智能账户的所有者。

```ts
const account = await toSoladySmartAccount({
  client,
  owner: privateKeyToAccount('0x...'), // [!code focus]
})
```

### salt（可选）

- **类型：** `Hex`

用于智能账户部署的盐值。

```ts
const account = await toSoladySmartAccount({
  client,
  owner,
  salt: '0x5', // [!code focus]
})
```