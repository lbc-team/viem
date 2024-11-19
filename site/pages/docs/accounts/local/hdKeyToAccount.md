# hdKeyToAccount [用于创建分层确定性 (HD) 账户的函数。]

一个 [分层确定性 (HD)](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#abstract) 账户是从一个 [HD 密钥](https://github.com/paulmillr/scure-bip32#usage) 和一个可选的 HD 路径派生而来的。

它能够使用从 HD 节点派生的私钥签署交易和消息。

:::info
viem 内部使用 [`@scure/bip32`](https://github.com/paulmillr/scure-bip32)，这是一个 **经过审计** 的 [BIP-32 HD 钱包](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#abstract) 实现，用于分层确定性 (HD) 钱包的派生。
:::

## 导入

```ts twoslash
import { HDKey, hdKeyToAccount } from 'viem/accounts'
```

> 注意：viem [重新导出 `HDKey`](https://github.com/paulmillr/scure-bip32#usage) 来自 `@scure/bip32`。

## 用法

要初始化一个 HD 账户，你需要将一个 [`HDKey` 实例](https://github.com/paulmillr/scure-bip32#usage) 传递给 `hdKeyToAccount`。

`HDKey` 实例带有一些静态方法来派生 HD 密钥：

- `fromMasterSeed`
- `fromExtendedKey`
- `fromJSON`

```ts twoslash
// @noErrors
import { createWalletClient, http } from 'viem'
import { HDKey, hdKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const hdKey = HDKey.fromMasterSeed(...) // [!code focus:3]
const hdKey = HDKey.fromExtendedKey(...)
const hdKey = HDKey.fromJSON({ xpriv: ... })

const account = hdKeyToAccount(hdKey) // [!code focus]

const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
})
```

## 参数

### hdKey

- **类型：** `string`

BIP-39 助记词短语。

```ts twoslash
// @noErrors
import { hdKeyToAccount } from 'viem/accounts'
// ---cut---
const hdKey = HDKey.fromMasterSeed(...)

const account = hdKeyToAccount(
  hdKey, // [!code focus]
)
```

### options.accountIndex

- **类型：** `number`
- **默认值：** `0`

在路径中使用的账户索引 (`"m/44'/60'/${accountIndex}'/0/0"`) 以派生私钥。

```ts twoslash
// @noErrors
import { hdKeyToAccount } from 'viem/accounts'
// ---cut---
const hdKey = HDKey.fromMasterSeed(...)

const account = hdKeyToAccount(
  hdKey,
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
// @noErrors
import { hdKeyToAccount } from 'viem/accounts'
// ---cut---
const hdKey = HDKey.fromMasterSeed(...)

const account = hdKeyToAccount(
  hdKey,
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
// @noErrors
import { hdKeyToAccount } from 'viem/accounts'
// ---cut---
const hdKey = HDKey.fromMasterSeed(...)

const account = hdKeyToAccount(
  hdKey,
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
// @noErrors
import { hdKeyToAccount } from 'viem/accounts'
// ---cut---
const hdKey = HDKey.fromMasterSeed(...)

const account = hdKeyToAccount(
  hdKey,
  {
    path: "m/44'/60'/5'/0/2" // [!code focus]
  }
)
```