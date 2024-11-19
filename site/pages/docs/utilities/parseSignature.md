---
description: 将十六进制格式的签名解析为结构化签名。
---

# parseSignature

将十六进制格式的签名解析为结构化（“分割”）签名。

## 导入

```ts
import { parseSignature } from 'viem'
```

## 用法

```ts
import { parseSignature } from 'viem'

parseSignature('0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c') // [!code focus:8]
/**
 * {
 *   r: '0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf',
 *   s: '0x4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db8',
 *   yParity: 1
 * }
 */
```

## 返回

[`Signature`](/docs/glossary/types#signature)

结构化（“分割”）签名。

## 参数

### signatureHex

十六进制格式的签名。

- **类型:** [`Hex`](/docs/glossary/types#hex)