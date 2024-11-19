---
description: 从合约中读取 EIP-712 域。
---

# getEip712Domain

根据 [ERC-5267 规范](https://eips.ethereum.org/EIPS/eip-5267) 从合约中读取 EIP-712 域。

## 用法

:::code-group

```ts twoslash [example.ts]
import { publicClient } from './client'

const { domain, extensions, fields } = await publicClient.getEip712Domain({ 
  address: '0x57ba3ec8df619d4d243ce439551cce713bb17411',
})
```

```ts [client.ts] filename="client.ts"
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

### 反事实调用

通过提供部署工厂（`factory` + `factoryData`）参数，可以读取尚未部署的合约的 EIP-712 域：

:::code-group

```ts twoslash [example.ts]
import { factory, publicClient } from './config'

const { domain, extensions, fields } = await publicClient.getEip712Domain({ 
  address: '0x57ba3ec8df619d4d243ce439551cce713bb17411',
  factory: factory.address,
  factoryData: encodeFunctionData({
    abi: factory.abi,
    functionName: 'createAccount',
    args: ['0x0000000000000000000000000000000000000000', 0n]
  }),
})
```

```ts [client.ts] filename="config.ts"
import { createPublicClient, http, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

export const factory = {
  address: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',
  abi: parseAbi(['function createAccount(address owner, uint256 salt)']),
} as const

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})
```

:::

## 返回

`GetEip712DomainReturnType`

合约的 EIP-712 域（`domain`），包含 `fields` 和 `extensions`，符合 [ERC-5267](https://eips.ethereum.org/EIPS/eip-5267)。

## 参数

### address

- **类型:** `string`

要读取 EIP-712 域的合约地址。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const result = await publicClient.getEip712Domain({ 
  address: '0x57ba3ec8df619d4d243ce439551cce713bb17411', // [!code focus]
})
```

### factory（可选）

- **类型:**

合约部署工厂地址（即 Create2 工厂、智能账户工厂等）。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const result = await publicClient.getEip712Domain({ 
  address: '0x57ba3ec8df619d4d243ce439551cce713bb17411',
  factory: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb', // [!code focus]
  factoryData: '0xdeadbeef',
})
```

### factoryData（可选）

- **类型:**

在工厂上执行的 calldata，以部署合约。

```ts twoslash
// [!include ~/snippets/publicClient.ts]
// ---cut---
const result = await publicClient.getEip712Domain({ 
  address: '0x57ba3ec8df619d4d243ce439551cce713bb17411',
  factory: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',
  factoryData: '0xdeadbeef', // [!code focus]
})
```