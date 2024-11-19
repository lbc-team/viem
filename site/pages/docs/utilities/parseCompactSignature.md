---
description: 将十六进制格式的紧凑签名解析为结构化的紧凑签名。
---

# parseCompactSignature

将十六进制格式的紧凑签名解析为结构化的（“分割”）紧凑签名。

## 导入

```ts
import { parseCompactSignature } from 'viem'
```

## 用法

```ts
import { parseCompactSignature } from 'viem'

parseCompactSignature('0x9328da16089fcba9bececa81663203989f2df5fe1faa6291a45381c81bd17f76939c6d6b623b42da56557e5e734a43dc83345ddfadec52cbe24d0cc64f550793') // [!code focus:7]
/**
 * {
 *   r: '0x9328da16089fcba9bececa81663203989f2df5fe1faa6291a45381c81bd17f76',
 *   yParityAndS: '0x939c6d6b623b42da56557e5e734a43dc83345ddfadec52cbe24d0cc64f550793'
 * }
 */
```

## 返回

[`CompactSignature`](/docs/glossary/types#compactsignature)

结构化的（“分割”）紧凑签名。

## 参数

### signatureHex

十六进制格式的紧凑签名。

- **类型:** [`Hex`](/docs/glossary/types#hex)