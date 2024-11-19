---
description: 将结构化签名序列化为十六进制格式。
---

# serializeSignature

将结构化签名序列化为十六进制格式。

## 导入

```ts
import { serializeSignature } from 'viem'
```

## 用法

```ts
import { serializeSignature } from 'viem'

serializeSignature({
  r: '0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf',
  s: '0x4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db8',
  yParity: 1
}) // [!code focus:8]
// "0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c"
```

## 返回

[`Hex`](/docs/glossary/types#hex)

十六进制格式的签名。

## 参数

### signature

签名。

- **类型:** [`Signature`](/docs/glossary/types#signature)