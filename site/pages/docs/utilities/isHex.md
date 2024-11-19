---
description: 检查值是否为十六进制值。
---

# isHex

检查值是否为十六进制值。

## 安装

```ts
import { isHex } from 'viem'
```

## 用法

```ts
import { isHex } from 'viem'

isHex('0x1a4')
// true

isHex('0x1a4z')
isHex('foo')
// false
```

## 返回

`boolean`

如果值是十六进制值，则返回真值。

## 参数

### value

- **类型:** `unknown`

要检查的值。

```ts
isHex(
  '0x1a4' // [!code focus]
)
// true
```

### options.strict

- **类型:** `boolean`
- **默认:** `true`

启用时，检查值是否严格由十六进制字符组成（`"0x[0-9a-fA-F]*"`）。
禁用时，检查值是否松散匹配十六进制格式（`value.startsWith('0x')`）。

```ts
isHex('0xlol', { strict: false })
// true

isHex('0xlol', { strict: true })
// false

isHex('lol', { strict: false })
// false
```