---
description: 创建一个多签名 ZKsync 智能账户
---

# toMultisigSmartAccount (ZKsync)

从合约地址和所有者的私钥创建一个多签名 [ZKsync 智能账户](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)。

## 用法

```ts twoslash
import { toMultisigSmartAccount } from 'viem/zksync'

const account = toMultisigSmartAccount({
  address: '0xf39Fd6e51aad8F6F4ce6aB8827279cffFb92266', 
  privateKeys: ['0x...', '0x...']
})
```

## 参数

### address

- **类型:** `Hex`

已部署账户合约实现的地址。

```ts
const account = toMultisigSmartAccount({
  address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // [!code focus]
  privateKeys: ['0x...', '0x...']
})
```

### privateKeys

- **类型:** `Hex[]`

所有者的私钥。

```ts
const account = toMultisigSmartAccount({
  address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 
  privateKeys: ['0x...', '0x...'] // [!code focus]
})
```