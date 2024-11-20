# 发送用户操作

下面的指南演示了如何使用 [智能账户](/account-abstraction/accounts/smart) 发送用户操作。

## 概述

这是如何使用智能账户广播用户操作的端到端概述。我们将其分解为下面的 [步骤](#steps)。

:::code-group

```ts twoslash [example.ts]
import { parseEther } from 'viem'
import { bundlerClient } from './config.js'
 
const hash = await bundlerClient.sendUserOperation({ 
  account, 
  calls: [{ 
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D', 
    value: parseEther('0.001') 
  }] 
}) 
 
const receipt = await bundlerClient.waitForUserOperationReceipt({ hash }) 
```

```ts twoslash [config.ts] filename="config.ts"
import { createPublicClient, http } from 'viem'
import { 
  createBundlerClient, 
  toCoinbaseSmartAccount 
} from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 
 
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
 
const owner = privateKeyToAccount('0x...')
 
const account = await toCoinbaseSmartAccount({ 
  client, 
  owners: [owner]
}) 

export const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

:::

## 步骤

### 1. 设置客户端

智能账户需要访问网络以查询其状态的信息（例如 nonce、地址等）。让我们设置一个可以用于智能账户的客户端：

```ts twoslash
// @noErrors
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

[查看 `createPublicClient` 文档](/docs/clients/public)

### 2. 设置捆绑客户端

接下来，我们需要设置一个捆绑客户端。捆绑器用于将用户操作提交到智能账户的区块链。

```ts twoslash
import { createPublicClient, http } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction' // [!code ++] // [!code focus]
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const bundlerClient = createBundlerClient({ // [!code ++] // [!code focus]
  client, // [!code ++] // [!code focus]
  transport: http('https://public.pimlico.io/v2/1/rpc'), // [!code ++] // [!code focus]
}) // [!code ++] // [!code focus]
```

:::info
上面的捆绑器 URL 是一个公共端点。请勿在生产中使用，因为你可能会受到速率限制。考虑使用 [Pimlico 的捆绑器](https://www.pimlico.io)、[Biconomy 的捆绑器](https://www.biconomy.io) 或其他捆绑服务。
:::

[查看 `createBundlerClient` 文档](/account-abstraction/clients/bundler)

### 3. 设置所有者

我们还需要为智能账户设置一个所有者，该所有者将用于为智能账户签署用户操作（交易）。

```ts twoslash
// @noErrors
import { createPublicClient, http } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' // [!code ++] // [!code focus]

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const bundlerClient = createBundlerClient({
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const owner = privateKeyToAccount('0x...') // [!code ++] // [!code focus]
```

[查看 `privateKeyToAccount` 文档](/docs/accounts/local/privateKeyToAccount)

### 4. 创建智能账户

接下来，我们将实例化一个智能账户。在此示例中，我们将使用 [`toCoinbaseSmartAccount`](/account-abstraction/accounts/smart/toCoinbaseSmartAccount)（Coinbase 智能钱包）。

```ts twoslash
// @noErrors
import { createPublicClient, http } from 'viem'
import { // [!code ++] // [!code focus]
  createBundlerClient, // [!code ++] // [!code focus]
  toCoinbaseSmartAccount // [!code ++] // [!code focus]
} from 'viem/account-abstraction' // [!code ++] // [!code focus]
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const bundlerClient = createBundlerClient({
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const owner = privateKeyToAccount('0x...')

const account = await toCoinbaseSmartAccount({ // [!code ++] // [!code focus]
  client, // [!code ++] // [!code focus]
  owners: [owner] // [!code ++] // [!code focus]
}) // [!code ++] // [!code focus]
```

:::tip
**提示：** `toCoinbaseSmartAccount` 还接受 [Passkey (WebAuthn) 账户](/account-abstraction/accounts/webauthn) 作为 `owner`。
:::

[查看 `toCoinbaseSmartAccount` 文档](/account-abstraction/accounts/smart/toCoinbaseSmartAccount)

### 5. 发送用户操作

接下来，我们将向捆绑器发送用户操作。在下面的示例中，我们将向一个随机地址发送 0.001 ETH。

```ts twoslash
import { createPublicClient, http, parseEther } from 'viem'
import { 
  createBundlerClient, 
  toCoinbaseSmartAccount 
} from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const bundlerClient = createBundlerClient({
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const owner = privateKeyToAccount('0x...')

const account = await toCoinbaseSmartAccount({ 
  client, 
  owners: [owner]
}) 

const hash = await bundlerClient.sendUserOperation({ // [!code ++] // [!code focus]
  account, // [!code ++] // [!code focus]
  calls: [{ // [!code ++] // [!code focus]
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D', // [!code ++] // [!code focus]
    value: parseEther('0.001') // [!code ++] // [!code focus]
  }] // [!code ++] // [!code focus]
}) // [!code ++] // [!code focus]

const receipt = await bundlerClient.waitForUserOperationReceipt({ hash }) // [!code ++] // [!code focus]
```

:::tip
**提示：** `calls` 属性还接受 [合约写入调用](/account-abstraction/actions/bundler/sendUserOperation#contract-calls)。
:::

[查看 `sendUserOperation` 文档](/account-abstraction/actions/bundler/sendUserOperation)

### 6. 可选：提升账户

如果你不希望将账户传递给每个需要 `account` 的操作，你还可以将账户提升到钱包客户端上。

```ts twoslash 
import { createPublicClient, http, parseEther } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const owner = privateKeyToAccount('0x...')

const account = await toCoinbaseSmartAccount({ 
  client, 
  owners: [owner]
}) 

const bundlerClient = createBundlerClient({
  account, // [!code ++]
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const hash = await bundlerClient.sendUserOperation({
  account, // [!code --]
  calls: [{
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
    value: parseEther('0.001')
  }]
})
```

### 7. 可选：赞助用户操作

通过使用支付者，我们可以添加用户操作费用的赞助。

Viem 在 **Bundler Client**（“在客户端”标签）和 **User Operation Action**（“在操作”标签）上暴露了一个 `paymaster` 属性，以添加用户操作赞助功能。

`paymaster` 属性接受一个 [Paymaster Client](/account-abstraction/clients/paymaster)（ [以及其他](/account-abstraction/actions/bundler/sendUserOperation#paymaster-optional) ），用于获取用户操作赞助所需的数据。

:::info
下面的示例使用 [Pimlico 的 Paymaster API](https://docs.pimlico.io/infra/paymaster) – 允许消费者在超过 30 条链上为用户赞助 gas 费用。
:::

:::code-group

```ts twoslash [example.ts (on Client)]
import { http } from 'viem'
import { 
  createBundlerClient, 
  createPaymasterClient,
} from 'viem/account-abstraction'
import { account, client } from './config.ts'

const paymasterClient = createPaymasterClient({ // [!code ++]
  transport: http('https://public.pimlico.io/v2/11155111/rpc'), // [!code ++]
}) // [!code ++]

const bundlerClient = createBundlerClient({
  account,
  client,
  paymaster: paymasterClient, // [!code ++]
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const hash = await bundlerClient.sendUserOperation({
  calls: [{
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
    value: parseEther('0.001')
  }]
})
```

```ts twoslash [example.ts (on Action)]
import { http } from 'viem'
import { 
  createBundlerClient, 
  createPaymasterClient,
} from 'viem/account-abstraction'
import { account, client } from './config.ts'

const paymasterClient = createPaymasterClient({ // [!code ++]
  transport: http('https://api.pimlico.io/v2/1/rpc?apikey={API_KEY}'), // [!code ++]
}) // [!code ++]

const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const hash = await bundlerClient.sendUserOperation({
  calls: [{
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
    value: parseEther('0.001')
  }]
  paymaster: paymasterClient, // [!code ++]
})
```

```ts twoslash [config.ts] filename="config.ts"
// @noErrors
import { createPublicClient, http, parseEther } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 

export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const owner = privateKeyToAccount('0x...')

export const account = await toCoinbaseSmartAccount({ 
  client, 
  owners: [owner]
}) 
```

:::

::::tip
如果你的 Bundler 也支持 Paymaster 赞助（`pm_` JSON-RPC 方法），你可以设置 `paymaster: true`，而不是声明一个单独的 Paymaster Client。

:::code-group

```ts twoslash [example.ts (on Client)]
import { http } from 'viem'
import { 
  createBundlerClient, 
  createPaymasterClient,
} from 'viem/account-abstraction'
import { account, client } from './config.ts'

const paymasterClient = createPaymasterClient({ // [!code --]
  transport: http('https://public.pimlico.io/v2/1/rpc'), // [!code --]
}) // [!code --]

const bundlerClient = createBundlerClient({
  account,
  client,
  paymaster: paymasterClient, // [!code --]
  paymaster: true, // [!code ++]
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})
```

```ts twoslash [example.ts (on Action)]
import { http } from 'viem'
import { 
  createBundlerClient, 
  createPaymasterClient,
} from 'viem/account-abstraction'
import { account, client } from './config.ts'

const paymasterClient = createPaymasterClient({ // [!code --]
  transport: http('https://public.pimlico.io/v2/1/rpc'), // [!code --]
}) // [!code --]

const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http('https://public.pimlico.io/v2/1/rpc'),
})

const hash = await bundlerClient.sendUserOperation({
  calls: [{
    to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
    value: parseEther('0.001')
  }]
  paymaster: paymasterClient, // [!code --]
  paymaster: true, // [!code ++]
})
```

```ts twoslash [config.ts] filename="config.ts"
// @noErrors
import { createPublicClient, http, parseEther } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 

export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const owner = privateKeyToAccount('0x...')

export const account = await toCoinbaseSmartAccount({ 
  client, 
  owners: [owner]
}) 
```

:::

::::