---
description: 通过 Solady 的 ERC-1271 格式对 EIP-712 类型数据进行哈希处理。
---

# hashTypedData

通过 [ERC-7739 `TypedDataSign` 格式](https://eips.ethereum.org/EIPS/eip-7739) 对 [EIP-712](https://eips.ethereum.org/EIPS/eip-712) 类型数据进行哈希处理。

## 导入

```ts
import { hashTypedData } from 'viem/experimental/solady'
```

## 用法

```ts
import { hashTypedData } from 'viem/experimental/solady'

hashTypedData({
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f',
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

## 返回

[`Hex`](/docs/glossary/types#hex)

可签名的类型数据哈希。

## 参数

### domain

**类型:** `TypedDataDomain`

类型数据域。

```ts
const hash = hashTypedData({
  domain: { // [!code focus:6]
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types,
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f',
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

### types

类型数据的类型定义。

```ts
const hash = hashTypedData({
  domain,
  types: { // [!code focus:11]
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f',
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

### primaryType

**类型:** 推断的 `string`。

要从 `types` 中提取并在 `value` 中使用的主要类型。

```ts
const hash = hashTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [ // [!code focus:5]
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', // [!code focus]
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f',
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

### message

**类型:** 从 `types` 和 `primaryType` 推断。

```ts
const hash = hashTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', 
  message: { // [!code focus:11]
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f',
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

### extensions

**类型:** `readonly bigint[]`

类型数据的扩展。

```ts
const hash = hashTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', 
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [], // [!code focus]
  fields: '0x0f',
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

### fields

**类型:** `Hex`

类型数据字段。

```ts
const hash = hashTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', 
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f',  // [!code focus]
  verifierDomain: {
    name: 'Smart Account',
    version: '1',
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678',
    chainId: 1,
  },
})
```

### verifierDomain

**类型:** `TypedDataDomain`

验证合约的域。

```ts
const hash = hashTypedData({
  domain,
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail', 
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
  extensions: [],
  fields: '0x0f', 
  verifierDomain: { // [!code focus]
    name: 'Smart Account', // [!code focus]
    version: '1', // [!code focus]
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678', // [!code focus]
    chainId: 1, // [!code focus]
  }, // [!code focus]
})
```