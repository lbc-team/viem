# createNonceManager [创建一个非重复值管理器以自动生成非重复值]

创建一个新的非重复值管理器实例，用于与 [本地账户](/docs/accounts/local) 一起使用。非重复值管理器用于自动管理和生成交易的非重复值。

:::warning
非重复值管理器只能与 [本地账户](/docs/accounts/local) 一起使用（即私钥、助记词等）。

对于 [JSON-RPC 账户](/docs/accounts/jsonRpc) （即浏览器扩展、WalletConnect、后端等），钱包或后端将管理非重复值。
:::

## 导入

```ts twoslash
import { createNonceManager } from 'viem/nonce'
```

## 用法

可以使用提供的`source`通过`createNonceManager`函数实例化一个非重复值管理器。

下面的示例演示了如何使用 JSON-RPC 源创建一个非重复值管理器（即使用`eth_getTransactionCount`作为真实来源）。

```ts twoslash
import { createNonceManager, jsonRpc } from 'viem/nonce'

const nonceManager = createNonceManager({
  source: jsonRpc()
})
```

:::tip
Viem 还导出了一个默认的`nonceManager`实例，你可以直接使用。

```ts twoslash
import { nonceManager } from 'viem'
```
:::

### 与本地账户的集成

可以将`nonceManager`作为选项传递给 [本地账户](/docs/accounts/local) ，以自动管理交易的非重复值。

:::code-group

```ts twoslash [example.ts]
import { privateKeyToAccount, nonceManager } from 'viem/accounts' // [!code focus]
import { client } from './config'

const account = privateKeyToAccount('0x...', { nonceManager }) // [!code focus]

const hashes = await Promise.all([ // [!code focus]
// @log:   ↓ nonce = 0
  client.sendTransaction({ // [!code focus]
    account, // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
    value: parseEther('0.1'), // [!code focus]
  }), // [!code focus]
// @log:   ↓ nonce = 1
  client.sendTransaction({ // [!code focus]
    account, // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
    value: parseEther('0.2'), // [!code focus]
  }), // [!code focus]
]) // [!code focus]
```

```ts twoslash [config.ts] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

export const client = createWalletClient({
  chain: mainnet,
  transport: http(),
})
```

:::

## 返回类型

`NonceManager`

非重复值管理器。

## 参数

### source

- **类型:** `NonceManagerSource`

非重复值管理器的真实来源。

可用来源：

- `jsonRpc`

```ts twoslash
import { createNonceManager, jsonRpc } from 'viem/nonce'

const nonceManager = createNonceManager({
  source: jsonRpc() // [!code focus]
})
```