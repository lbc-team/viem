# 钱包客户端 [创建钱包客户端的功能]

钱包客户端是与 [以太坊账户](https://ethereum.org/en/glossary/#account) 交互的接口，提供检索账户、执行交易、签名消息等功能，通过 [钱包操作](/docs/actions/wallet/introduction)。

`createWalletClient` 函数使用给定的 [传输方式](/docs/clients/intro) 设置钱包客户端。

钱包客户端支持对以下内容进行签名：

- [JSON-RPC 账户](#json-rpc-accounts)（例如，浏览器扩展钱包、WalletConnect 等）。
- [本地账户](#local-accounts-private-key-mnemonic-etc)（例如，私钥/助记词钱包）。

## 导入

```ts
import { createWalletClient } from 'viem'
```

## JSON-RPC 账户

[JSON-RPC 账户](/docs/accounts/jsonRpc) **推迟** 通过 JSON-RPC 对交易和消息进行签名。一个例子是通过浏览器扩展钱包（例如 MetaMask）使用 `window.ethereum` 提供者发送交易。

以下是如何设置 JSON-RPC 账户的示例。

#### 1: 初始化钱包客户端

在设置账户并开始使用钱包操作之前，我们需要使用 [`custom` 传输方式](/docs/clients/transports/custom) 设置钱包客户端，在这里我们将传入 `window.ethereum` 提供者：

```ts twoslash
import 'viem/window'
// ---cut---
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})
```

#### 2: 设置你的 JSON-RPC 账户

我们希望检索一个可以在钱包中访问的地址（例如 MetaMask）。

```ts twoslash
import 'viem/window'
// ---cut---
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})

const [address] = await client.getAddresses() // [!code focus:10]
// 或: const [address] = await client.requestAddresses() // [!code focus:10]
```

> 注意：某些钱包（如 MetaMask）可能需要你首先通过 [`client.requestAddresses`](/docs/actions/wallet/requestAddresses) 请求访问账户地址。

#### 3: 使用 [钱包操作](/docs/actions/wallet/introduction)

现在你可以在需要用户签名的钱包操作中使用该地址：

```ts twoslash
import 'viem/window'
// ---cut---
import { createWalletClient, custom, parseEther } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!)
})

const [address] = await client.getAddresses()

const hash = await client.sendTransaction({ // [!code focus:10]
  account: address,
  to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('0.001')
})
```

#### 可选：提升账户

如果你不想将账户传递给每个需要 `account` 的操作，你也可以将账户提升到钱包客户端中。

```ts twoslash
import 'viem/window'
// ---cut---
import { createWalletClient, http, parseEther } from 'viem'
import { mainnet } from 'viem/chains'

const [account] = await window.ethereum!.request({ method: 'eth_requestAccounts' })

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

## 本地账户（私钥、助记词等）

本地账户在通过 JSON-RPC 执行方法之前，使用私钥 **对** 交易和消息进行签名。

在 viem 中有三种类型的本地账户：

- [私钥账户](/docs/accounts/local/privateKeyToAccount)
- [助记词账户](/docs/accounts/local/mnemonicToAccount)
- [分层确定性（HD）账户](/docs/accounts/local/hdKeyToAccount)

以下是集成 **私钥账户** 的步骤，但相同的步骤也适用于 **助记词和 HD 账户**。

#### 1: 初始化钱包客户端

在设置账户并开始使用钱包操作之前，我们需要使用 [`http` 传输方式](/docs/clients/transports/http) 设置钱包客户端：

```ts twoslash
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: http()
})
```

#### 2: 设置你的本地账户

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

#### 3: 使用 [钱包操作](/docs/actions/wallet/introduction)

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

#### 可选：提升账户

如果你不想将账户传递给每个需要 `account` 的操作，你也可以将账户提升到钱包客户端中。

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

#### 可选：扩展公共操作

使用本地账户时，你可能会发现自己使用与钱包客户端相同参数（`transport`、`chain` 等）实例化的 [公共客户端](/docs/clients/public)。

在这种情况下，你可以通过 [公共操作](/docs/actions/public/introduction) 扩展你的钱包客户端，以避免处理多个客户端。

```ts twoslash
// @noErrors
import { createWalletClient, http, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount('0x...')

const client = createWalletClient({ // [!code focus]
  account,
  chain: mainnet,
  transport: http()
}).extend(publicActions) // [!code ++] // [!code focus]

const { request } = await client.simulateContract({ ... }) // 公共操作 // [!code focus]
const hash = await client.writeContract(request) // 钱包操作 // [!code focus]
```

## 参数

### account（可选）

- **类型：** `Account | Address`

用于钱包客户端的账户。这将用于需要 `account` 作为参数的操作。

接受 [JSON-RPC 账户](#json-rpc-accounts) 或 [本地账户（私钥等）](#local-accounts-private-key-mnemonic-etc)。

```ts twoslash
import 'viem/window'
// ---cut---
import { createWalletClient, custom, parseEther } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: '0x...', // [!code focus]
  chain: mainnet,
  transport: custom(window.ethereum!)
})

const hash = await client.sendTransaction({
  to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  value: parseEther('0.001')
})
```

### chain (可选)

- **类型:** [Chain](/docs/glossary/types#chain)

钱包客户端的 [Chain](/docs/chains/introduction)。

在 [`sendTransaction`](/docs/actions/wallet/sendTransaction) 和 [`writeContract`](/docs/contract/writeContract) 操作中使用，以确保链与钱包的活动链匹配。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createWalletClient({
  chain: mainnet, // [!code focus]
  transport: custom(window.ethereum!)
})
```

### cacheTime (可选)

- **类型:** `number`
- **默认值:** `client.pollingInterval`

缓存数据在内存中保留的时间（以毫秒为单位）。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
// ---cut---
const client = createWalletClient({
  cacheTime: 10_000, // [!code focus]
  chain: mainnet,
  transport: custom(window.ethereum!)
})
```

### ccipRead (可选)

- **类型:** `(parameters: CcipRequestParameters) => Promise<CcipRequestReturnType> | false`
- **默认值:** `true`

[CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) 配置。

CCIP Read 默认启用，但如果设置为 `false`，客户端将不支持链外 CCIP 查找。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
// ---cut---
const client = createWalletClient({
  ccipRead: false, // [!code focus]
  transport: custom(window.ethereum!)
})
```

### ccipRead.request (可选)

- **类型:** `(parameters: CcipRequestParameters) => Promise<CcipRequestReturnType>`

一个将被调用以进行 [链外 CCIP 查找请求](https://eips.ethereum.org/EIPS/eip-3668#client-lookup-protocol) 的函数。

```ts twoslash
// @noErrors
import 'viem/window'
import { createWalletClient, custom } from 'viem'
// ---cut---
const client = createWalletClient({
  ccipRead: { // [!code focus]
    async request({ data, sender, urls }) { // [!code focus]
      // ... // [!code focus]
    } // [!code focus]
  }, // [!code focus]
  transport: custom(window.ethereum!)
})
```

### key (可选)

- **类型:** `string`
- **默认值:** `"wallet"`

客户端的键。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
// ---cut---
const client = createWalletClient({
  key: 'foo', // [!code focus]
  transport: custom(window.ethereum!)
})
```

### name (可选)

- **类型:** `string`
- **默认值:** `"Wallet Client"`

客户端的名称。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
// ---cut---
const client = createWalletClient({
  name: 'Foo Wallet Client', // [!code focus]
  transport: custom(window.ethereum!)
})
```

### pollingInterval (可选)

- **类型:** `number`
- **默认值:** `4_000`

启用操作的轮询频率（以毫秒为单位）。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
// ---cut---
const client = createWalletClient({
  pollingInterval: 10_000, // [!code focus]
  transport: custom(window.ethereum!)
})
```

### rpcSchema (可选)

- **类型:** `RpcSchema`
- **默认值:** `WalletRpcSchema`

客户端的类型化 JSON-RPC 架构。

```ts twoslash
import 'viem/window'
import { createWalletClient, custom } from 'viem'
// @noErrors
// ---cut---
import { rpcSchema } from 'viem'

type CustomRpcSchema = [{ // [!code focus]
  Method: 'eth_wagmi', // [!code focus]
  Parameters: [string] // [!code focus]
  ReturnType: string // [!code focus]
}] // [!code focus]

const client = createWalletClient({
  rpcSchema: rpcSchema<CustomRpcSchema>(), // [!code focus]
  transport: custom(window.ethereum!)
})

const result = await client.request({ // [!code focus]
  method: 'eth_wa // [!code focus] 
//               ^|
  params: ['hello'], // [!code focus]
}) // [!code focus]
```