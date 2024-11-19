# 本地账户（私钥、助记词等）

本地账户是一个其签名密钥存储在使用者机器上的账户。它在通过 JSON-RPC 广播交易或消息之前，使用私钥对交易和消息进行签名。

在 viem 中有三种类型的本地账户：

- [私钥账户](/docs/accounts/local/privateKeyToAccount)
- [助记词账户](/docs/accounts/local/mnemonicToAccount)
- [分层确定性（HD）账户](/docs/accounts/local/hdKeyToAccount)

## 实例化

### 1. 初始化钱包客户端

在我们设置账户并开始使用钱包操作之前，我们需要使用 [`http` 传输](/docs/clients/transports/http) 设置钱包客户端：

```ts twoslash
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: http()
})
```

### 2. 设置本地账户

接下来，我们将使用 `privateKeyToAccount` 实例化一个私钥账户：

```ts twoslash
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts' // [!code focus]
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: http()
})

const account = privateKeyToAccount('0x...') // [!code focus:1]
```

### 3. 使用 [钱包操作](/docs/actions/wallet/introduction)

现在你可以在需要用户签名的钱包操作中使用该账户：

```ts twoslash
import { createWalletClient, http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: http()
})

const account = privateKeyToAccount('0x...')

const hash = await client.sendTransaction({ // [!code focus:5]
  account,
  to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('0.001')
})
```

### 4. 可选：提升账户

如果你不希望将账户传递给每个需要 `account` 的操作，你也可以将账户提升到钱包客户端中。

```ts twoslash
import { createWalletClient, http, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount('0x...')

const client = createWalletClient({ // [!code focus:99]
  account, // [!code ++]
  chain: mainnet,
  transport: http()
})

const hash = await client.sendTransaction({
  account, // [!code --]
  to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('0.001')
})
```

### 5. 可选：扩展公共操作

在使用本地账户时，你可能会发现自己使用与钱包客户端具有相同参数（`transport`、`chain` 等）的 [公共客户端](/docs/clients/public) 实例。

在这种情况下，你可以通过 [公共操作](/docs/actions/public/introduction) 扩展你的钱包客户端，以避免处理多个客户端。

```ts twoslash {12}
// @noErrors
import { createWalletClient, http, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount('0x...')

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
}).extend(publicActions) // [!code ++]

const { request } = await client.simulateContract({ ... }) // 公共操作
const hash = await client.writeContract(request) // 钱包操作
```