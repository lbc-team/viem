---
description: 检查给定的地址（带校验和）是否相等。
---

# isAddressEqual

检查给定的地址（带校验和）是否相等。

## 导入

```ts
import { isAddressEqual } from 'viem'
```

## 用法

```ts
import { isAddressEqual } from 'viem'

isAddressEqual('0xa5cc3c03994db5b0d9a5eEdD10Cabab0813678ac', '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC') // [!code focus:2]
// true
```

## 返回

`boolean`

地址是否相等。