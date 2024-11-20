---
description: 创建一个带有提供的账户实现的智能账户。
---

# toSmartAccount

`toSmartAccount` 函数允许你使用自定义账户实现创建一个智能账户。

## 导入

```ts
import { toSmartAccount } from 'viem/account-abstraction'
```

## 用法

要实例化一个智能账户，你需要提供一个账户实现。

:::code-group

```ts twoslash [example.ts]
import { coinbase, toSmartAccount } from 'viem/account-abstraction'
import { client, owner } from './config.js'

const account = await toSmartAccount({
  client,
  entryPoint: {
    abi: [/* ... */],
    address: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
    version: '0.7',
  },
  
  async decodeCalls(data) {
    // 根据智能账户合约的定义解码调用。
  },
  async encodeCalls(calls) {
    // 根据智能账户合约的定义编码调用。
  },
  async getAddress() {
    // 获取智能账户的地址。
  },
  async getFactoryArgs() {
    // 构建智能账户的工厂属性。
  },
  async getNonce() {
    // 获取智能账户的 nonce。
  },
  async getStubSignature() {
    // 获取智能账户的用户操作的存根签名。
  },
  async signMessage(message) {
    // 签署消息以供智能账户合约验证。
  },
  async signTypedData(typedData) {
    // 签署类型数据以供智能账户合约验证。
  },
  async signUserOperation(userOperation) {
    // 签署用户操作以通过捆绑器广播。
  },

  // （可选）使用自定义属性扩展智能账户。
  extend: {
    abi: [/* ... */],
    factory: {
      abi: [/* ... */],
      address: '0xda4b37208c41c4f6d1b101cac61e182fe1da0754',
    },
  },
  // （可选）用户操作配置。
  userOperation: {
    async estimateGas(userOperation) {
      // 估算用户操作的 gas 属性。
    },
  },
})
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

## 返回

`SmartAccount`

智能账户。