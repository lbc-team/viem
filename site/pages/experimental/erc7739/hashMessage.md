---
description: 通过 ERC-7739 格式对 EIP-191 消息进行哈希处理。
---

# hashMessage

通过 [ERC-7739 `PersonalSign` 格式](https://eips.ethereum.org/EIPS/eip-7739) 计算 [EIP-191](https://eips.ethereum.org/EIPS/eip-191) 个人签名哈希。

## 导入

```ts
import { hashMessage } from 'viem/experimental/erc7739'
```

## 用法

```ts
import { hashMessage } from 'viem/experimental/erc7739'

// 哈希一个 UTF-8 值。
hashMessage({ 
  message: 'hello world', 
  verifierDomain: { 
    name: 'Smart Account', 
    version: '1', 
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678', 
    chainId: 1, 
  }, 
}) 

// 哈希一个十六进制数据值。
hashMessage({ 
  message: { raw: '0x68656c6c6f20776f726c64' }, 
  verifierDomain: { 
    name: 'Smart Account', 
    version: '1', 
    verifyingContract: '0x1234567890abcdef1234567890abcdef12345678', 
    chainId: 1, 
  }, 
}) 

// 哈希一个字节数据值。
hashMessage({ 
  message: {
    raw: Uint8Array.from([
      104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
    ])
  }, 
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

可签名的消息哈希。

## 参数

### message

- **类型:** `string | { raw: Hex | ByteArray }`

要哈希的消息。

### verifierDomain

- **类型:** `TypedDataDomain`

验证合约的 EIP-712 域。