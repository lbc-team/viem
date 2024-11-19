---
description: 将地址转换为校验和编码的地址。
---

# getAddress

将地址转换为[校验和编码](https://eips.ethereum.org/EIPS/eip-55)的地址。支持 [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191)。

## 导入

```ts
import { getAddress } from 'viem'
```

## 用法

```ts
import { getAddress } from 'viem'

getAddress('0xa5cc3c03994db5b0d9a5eEdD10Cabab0813678ac') // [!code focus:2]
// '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'
```

## 返回

[`Address`](/docs/glossary/types#address)

校验和地址。

## 参数

### address

- **类型:** `string`

以太坊地址。

### chainId（可选）

- **类型:** `number`

地址所在网络的链 ID。符合 [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191)。

:::warning[警告]
EIP-1191 校验和地址通常与更广泛的以太坊生态系统不向后兼容，这意味着在与依赖于 EIP-55 校验和编码（没有 chainId 的校验和）的应用程序/工具进行验证时会出现问题。

强烈建议在不确定的情况下不要使用此功能。

更多信息请参见: https://github.com/ethereum/EIPs/issues/1121
:::