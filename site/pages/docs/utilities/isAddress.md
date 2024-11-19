---
description: 检查地址是否有效。
---

# isAddress

检查地址是否有效。默认情况下，它还会验证地址是否为校验和格式。

## 导入

```ts
import { isAddress } from 'viem'
```

## 用法

```ts
import { isAddress } from 'viem'

isAddress('0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC') // [!code focus:2]
// true
```

## 返回值

`boolean`

地址是否有效。

## 参数

### address

- **类型:** `string`

以太坊地址。

### options.strict (可选)

- **类型:** `boolean`
- **默认值:** `true`

启用严格模式。如果启用，它还会验证地址是否为校验和格式。

```ts
isAddress('0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac', { strict: false })
// true

isAddress('0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac', { strict: true })
// false

isAddress('lol', { strict: false })
// false
```