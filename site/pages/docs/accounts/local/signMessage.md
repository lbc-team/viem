# signMessage (本地账户) [使用账户的私钥签名消息。]

计算以太坊特定的签名，格式为 [EIP-191](https://eips.ethereum.org/EIPS/eip-191)：`keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`。

使用计算出的签名，你可以：

- 使用 [`verifyMessage`](/docs/utilities/verifyMessage) 验证签名，
- 使用 [`recoverMessageAddress`](/docs/utilities/recoverMessageAddress) 从签名中恢复签名地址。

## 用法

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x...')

const signature = await account.signMessage({
  // 消息的十六进制数据表示。
  message: { raw: '0x68656c6c6f20776f726c64' },
})
// @log: 输出: "0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b"
```

## 返回

[`Hex`](/docs/glossary/types#hex)

签名的消息。

## 参数

### message

- **类型:** `string | { raw: Hex | ByteArray }`

要签名的消息。

默认情况下，viem 签名消息的 UTF-8 表示。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signMessage({
  message: 'hello world', // [!code focus:1]
})
```

要签名消息的数据表示，你可以使用 `raw` 属性。

```ts twoslash
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount('0x...')
// ---cut---
const signature = await account.signMessage({
  message: { raw: '0x68656c6c6f20776f726c64' }, // [!code focus:1]
})
```