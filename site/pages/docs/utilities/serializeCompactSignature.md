---
description: 将紧凑签名序列化为十六进制格式。
---

# serializeCompactSignature

将 [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098) 紧凑签名序列化为十六进制格式。

## 导入

```ts
import { serializeCompactSignature } from 'viem'
```

## 用法

```ts
import { serializeCompactSignature } from 'viem'

serializeCompactSignature({ // [!code focus:8]
  r: '0x68a020a209d3d56c46f38cc50a33f704f4a9a10a59377f8dd762ac66910e9b90',
  yParityAndS:
    '0x7e865ad05c4035ab5792787d4a0297a43617ae897930a6fe4d822b8faea52064',
})
// "0x68a020a209d3d56c46f38cc50a33f704f4a9a10a59377f8dd762ac66910e9b907e865ad05c4035ab5792787d4a0297a43617ae897930a6fe4d822b8faea52064"
```

## 返回

[`Hex`](/docs/glossary/types#hex)

十六进制格式的签名。

## 参数

### compactSignature

紧凑签名。

- **类型:** [`CompactSignature`](/docs/glossary/types#CompactSignature)