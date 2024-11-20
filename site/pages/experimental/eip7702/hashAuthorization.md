---
description: 计算 EIP-7702 格式的授权对象哈希。
---

# hashAuthorization

计算 [EIP-7702 格式](https://eips.ethereum.org/EIPS/eip-7702) 的授权哈希：`keccak256('0x05' || rlp([chain_id, address, nonce]))`。

## 导入

```ts twoslash
import { hashAuthorization } from 'viem/experimental'
```

## 用法

```ts twoslash
import { hashAuthorization } from 'viem/experimental'

hashAuthorization({
  contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  chainId: 1,
  nonce: 0,
})
// 0xd428ed36e6098e46b40a4cb99b83b930b0ca1f054f40b5996589eda33c295663
```

## 返回

[`Hash`](/docs/glossary/types#hash)

已哈希的授权。

## 参数

### address

- **类型:** `Address`

要设置为 Authority 代码的合约地址。

```ts twoslash
import { hashAuthorization } from 'viem/experimental'

hashAuthorization({
  contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // [!code focus]
  chainId: 1,
  nonce: 0,
}) 
```

### chainId

- **类型:** `number`

要授权的链 ID。

```ts twoslash
import { hashAuthorization } from 'viem/experimental'

hashAuthorization({
  contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  chainId: 1, // [!code focus]
  nonce: 0,
}) 
```

### nonce

- **类型:** `number`

要授权的 Authority 的 nonce。

```ts twoslash
import { hashAuthorization } from 'viem/experimental'

hashAuthorization({
  contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  chainId: 1,
  nonce: 0, // [!code focus]
}) 
```

### to

- **类型:** `"hex" | "bytes"`
- **默认:** `"hex"`

输出格式。

```ts twoslash
import { hashAuthorization } from 'viem/experimental'

hashAuthorization({
  contractAddress: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  chainId: 1,
  nonce: 0, 
  to: 'bytes', // [!code focus]
}) 
```