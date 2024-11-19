# privateKeyToAccount [用于创建私钥账户的函数]

私钥账户是一个接口，能够使用给定的私钥对交易和消息进行签名。

:::info
viem 内部使用 [`@noble/curves`](https://github.com/paulmillr/noble-curves)，这是一个经过**审计**的 [secp256k1](https://www.secg.org/sec2-v2.pdf) 实现，用于我们的私钥和签名实现。
:::

## 导入

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'
```

## 用法

要初始化一个私钥账户，你需要将私钥传递给 `privateKeyToAccount`：

```ts twoslash
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80') // [!code focus]

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
})
```

> 注意：上述是一个有效的私钥，但它不是一个“真实”的私钥。请勿将其用于测试以外的任何用途。

### 生成私钥

你可以使用 `generatePrivateKey` 函数生成一个随机私钥：

```ts twoslash
import { generatePrivateKey } from 'viem/accounts'

const privateKey = generatePrivateKey()
```

## 参数

### privateKey

- **类型：** `Hex`

用于账户的私钥。