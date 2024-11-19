---
description: 以 EIP-191 格式对消息进行哈希。
---

# hashMessage

计算以 [EIP-191 格式](https://eips.ethereum.org/EIPS/eip-191) 的以太坊特定哈希：`keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`。

## 导入

```ts
import { hashMessage } from 'viem'
```

## 用法

```ts
import { hashMessage } from 'viem'

hashMessage('hello world') // [!code focus:2]
// 0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68

// 哈希一个十六进制数据值。  // [!code focus:3]
hashMessage({ raw: '0x68656c6c6f20776f726c64' })
// 0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68

// 哈希一个字节数据值。  // [!code focus:6]
hashMessage({ 
  raw: Uint8Array.from([
    104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
  ])})
// 0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68
```

## 返回

[`Hex`](/docs/glossary/types#hex)

哈希后的消息。

## 参数

### message

要哈希的消息。

- **类型：** `string | { raw: Hex | ByteArray }`