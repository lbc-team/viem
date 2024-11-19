---
description: 将紧凑签名解析为签名格式。
---

# compactSignatureToSignature

将 [EIP-2098](https://eips.ethereum.org/EIPS/eip-2098) 紧凑签名解析为签名格式。

## 导入

```ts
import { compactSignatureToSignature } from 'viem'
```

## 用法

```ts
import { compactSignatureToSignature } from 'viem'

compactSignatureToSignature({ // [!code focus:10]
  r: '0x68a020a209d3d56c46f38cc50a33f704f4a9a10a59377f8dd762ac66910e9b90',
  yParityAndS:
    '0x7e865ad05c4035ab5792787d4a0297a43617ae897930a6fe4d822b8faea52064',
})
// {
//   r: '0x68a020a209d3d56c46f38cc50a33f704f4a9a10a59377f8dd762ac66910e9b90',
//   s: '0x7e865ad05c4035ab5792787d4a0297a43617ae897930a6fe4d822b8faea52064',
//   yParity: 0,
// }
```

## 返回

[`Signature`](/docs/glossary/types#signature)

签名。

## 参数

### compactSignature

紧凑签名。

- **类型:** [`CompactSignature`](/docs/glossary/types#CompactSignature)