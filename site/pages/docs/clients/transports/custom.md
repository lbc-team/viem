# 自定义传输 [为客户端创建自定义传输的函数]

`custom` 传输接受一个 [EIP-1193 `request` 函数](https://eips.ethereum.org/EIPS/eip-1193#request-1) 作为参数。此传输对于与注入钱包、提供 EIP-1193 提供者的钱包（例如 WalletConnect 或 Coinbase SDK）集成，或甚至提供你自己的自定义 `request` 函数非常有用。

## 导入

```ts twoslash
import { custom } from 'viem'
```

## 用法

你可以使用任何 [EIP-1193 兼容](https://eips.ethereum.org/EIPS/eip-1193) 的以太坊提供者与 `custom` 传输：

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

或者你可以定义自己的：

```ts twoslash
// @noErrors
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { customRpc } from './rpc'

const client = createWalletClient({ 
  chain: mainnet,
  transport: custom({
    async request({ method, params }) {
      const response = await customRpc.request(method, params)
      return response
    }
  })
})
```

## 参数

### provider

- **类型：** `custom`

一个 [EIP-1193 `request` 函数](https://eips.ethereum.org/EIPS/eip-1193#request) 函数。

```ts twoslash
// @noErrors
import { custom } from 'viem'
// ---cut---
import { customRpc } from './rpc'

const transport = custom({
  async request({ method, params }) { // [!code focus:3]
    const response = await customRpc.request(method, params)
    return response
  }
})
```

### key（可选）

- **类型：** `string`
- **默认值：** `"custom"`

传输的键。

```ts twoslash
import 'viem/window'
import { custom } from 'viem'
// ---cut---
const transport = custom(
  window.ethereum!,
  { 
    key: 'windowProvider', // [!code focus]
  }
)
```

### name（可选）

- **类型：** `string`
- **默认值：** `"Ethereum Provider"`

传输的名称。

```ts twoslash
import 'viem/window'
import { custom } from 'viem'
// ---cut---
const transport = custom(
  window.ethereum!,
  { 
    name: 'Window Ethereum Provider', // [!code focus]
  }
)
```

### retryCount（可选）

- **类型：** `number`
- **默认值：** `3`

请求失败时的最大重试次数。

```ts twoslash
import 'viem/window'
import { custom } from 'viem'
// ---cut---
const transport = custom(window.ethereum!, {
  retryCount: 5, // [!code focus]
})
```

### retryDelay（可选）

- **类型：** `number`
- **默认值：** `150`

重试之间的基本延迟（以毫秒为单位）。默认情况下，传输将使用 [指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)（`~~(1 << count) * retryDelay`），这意味着重试之间的时间不是恒定的。

```ts twoslash
import 'viem/window'
import { custom } from 'viem'
// ---cut---
const transport = custom(window.ethereum!, {
  retryDelay: 100, // [!code focus]
})
```

## 注意事项

- 如果你将 `custom` 传输与 [公共客户端](/docs/clients/public) 配对，请确保你的提供者支持 [公共操作](/docs/actions/public/introduction)。