# JSON-RPC 账户 [创建 JSON-RPC 账户的函数]

JSON-RPC 账户是一个其签名密钥存储在外部钱包中的账户。它将交易和消息的签名委托给目标钱包，通过 JSON-RPC 进行处理。这样的钱包的一个例子可以是浏览器扩展钱包，或通过 WalletConnect 的移动钱包。

## 用法

JSON-RPC 账户可以简单地初始化为一个 [地址](/docs/glossary/types#address) 字符串。在下面的用法中，我们通过 `eth_requestAccounts` 从浏览器扩展钱包（例如 MetaMask）提取地址，使用 `window.ethereum` 提供者：

```ts twoslash
// @noErrors
import 'viem/window'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const [address] = await window.ethereum.request({ // [!code focus:3]
  method: 'eth_requestAccounts' 
})

const client = createWalletClient({
  account: address, // [!code focus]
  chain: mainnet,
  transport: custom(window.ethereum!)
})
```