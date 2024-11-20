---
description: 创建一个 ZKsync 智能账户
---

# toSmartAccount (ZKsync)

从合约地址和自定义签名函数创建一个 [ZKsync 智能账户](https://docs.zksync.io/build/developer-reference/account-abstraction/building-smart-accounts)。

## 用法

```ts twoslash
import { toSmartAccount } from 'viem/zksync'

const account = toSmartAccount({
  address: '0xf39Fd6e51aad8F6F4ce6aB8827279cffFb92266', 
  async sign({ hash }) {
    // ... 签名逻辑
    return '0x...'
  }
})
```

## 参数

### address

- **类型:** `Hex`

已部署账户合约实现的地址。

```ts
const account = toSmartAccount({
  address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // [!code focus]
  async sign({ hash }) {
    // ...
  }
})
```

### sign

- **类型:** `({ hash: Hex }) => Hex`

智能账户的自定义签名函数。

```ts
const account = toSmartAccount({
  address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 
  async sign({ hash }) { // [!code focus]
    // ... // [!code focus]
  } // [!code focus]
})
```