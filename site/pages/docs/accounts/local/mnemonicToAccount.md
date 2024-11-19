# mnemonicToAccount [创建助记词账户的函数]

助记词账户是一个 [分层确定性 (HD) 账户](/docs/accounts/local/hdKeyToAccount)，它是从 [BIP-39 助记词短语](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) 和一个可选的 HD 路径派生而来的。

它能够使用从 HD 节点派生的私钥签署交易和消息。

:::info
viem 内部使用 [`@scure/bip32`](https://github.com/paulmillr/scure-bip32)，这是一个经过**审计**的 [BIP-32 HD 钱包](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#abstract) 实现，用于分层确定性 (HD) 钱包的派生。
:::

## 导入

```ts twoslash
import { mnemonicToAccount } from 'viem/accounts'
```

## 用法

要初始化一个助记词账户，你需要将助记词短语传递给 `mnemonicToAccount`：

```ts twoslash
import { createWalletClient, http } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const account = mnemonicToAccount('legal winner thank year wave sausage worth useful legal winner thank yellow') // [!code focus]

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
})
```

> 注意：上述是一个有效的助记词，但它不是一个“真实”的助记词。请不要将其用于除测试以外的任何用途。

### 生成助记词

你可以使用 `generateMnemonic` 函数和单词列表生成一个随机的 BIP-39 助记词：

```ts twoslash
import { english, generateMnemonic } from 'viem/accounts'

const mnemonic = generateMnemonic(english)
```

:::tip
你可以通过将一个介于 128 和 256 之间的值作为 `generateMnemonic` 函数的第二个参数来定制生成的助记词的强度。该值必须是 32 的倍数。
:::

可用的单词列表：

- `czech`
- `english`
- `french`
- `italian`
- `japanese`
- `korean`
- `portuguese`
- `simplifiedChinese`
- `spanish`
- `traditionalChinese`

## 参数

### mnemonic

- **类型：** `string`

BIP-39 助记词短语。

```ts twoslash
import { mnemonicToAccount } from 'viem/accounts'
// ---cut---
const account = mnemonicToAccount(
  'legal winner thank year wave sausage worth useful legal winner thank yellow' // [!code focus]
)
```

### options.accountIndex

- **类型：** `number`
- **默认值：** `0`

在路径中使用的账户索引 (`"m/44'/60'/${accountIndex}'/0/0"`) 以派生私钥。

```ts twoslash
import { mnemonicToAccount } from 'viem/accounts'
// ---cut---
const account = mnemonicToAccount(
  'legal winner thank year wave sausage worth useful legal winner thank yellow',
  {
    accountIndex: 1 // [!code focus]
  }
)
```

### options.addressIndex

- **类型：** `number`
- **默认值：** `0`

在路径中使用的地址索引 (`"m/44'/60'/0'/0/${addressIndex}"`) 以派生私钥。

```ts twoslash
import { mnemonicToAccount } from 'viem/accounts'
// ---cut---
const account = mnemonicToAccount(
  'legal winner thank year wave sausage worth useful legal winner thank yellow',
  {
    accountIndex: 1,
    addressIndex: 6 // [!code focus]
  }
)
```

### options.changeIndex

- **类型：** `number`
- **默认值：** `0`

在路径中使用的变更索引 (`"m/44'/60'/0'/${changeIndex}/0"`) 以派生私钥。

```ts twoslash
import { mnemonicToAccount } from 'viem/accounts'
// ---cut---
const account = mnemonicToAccount(
  'legal winner thank year wave sausage worth useful legal winner thank yellow',
  {
    accountIndex: 1,
    addressIndex: 6,
    changeIndex: 2 // [!code focus]
  }
)
```

### options.path

- **类型：** `"m/44'/60'/${string}"`

用于派生私钥的 HD 路径。

```ts twoslash
import { mnemonicToAccount } from 'viem/accounts'
// ---cut---
const account = mnemonicToAccount(
  'legal winner thank year wave sausage worth useful legal winner thank yellow',
  {
    path: "m/44'/60'/5'/0/2" // [!code focus]
  }
)
```