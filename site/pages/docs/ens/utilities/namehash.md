---
description: 哈希 ENS 名称。
---

# namehash

哈希 ENS 名称。

## 导入

```ts
import { namehash, normalize } from 'viem/ens'
```

## 用法

```ts
import { namehash, normalize } from 'viem/ens'

namehash('wevm.eth') // [!code focus:2]
// '0xf246651c1b9a6b141d19c2604e9a58f567973833990f830d882534a747801359'
```

:::warning
由于 ENS 名称禁止某些禁用字符（例如下划线）并具有其他验证规则，因此在将其传递给 `namehash` 之前，你可能希望使用 [UTS-46 规范化](https://unicode.org/reports/tr46) 来 [规范化 ENS 名称](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names)。你可以使用内置的 [`normalize`](/docs/ens/utilities/normalize) 函数来实现。
:::

## 返回值

`string`

哈希后的 ENS 名称。

## 参数

### name

- **类型:** `string`

一个 ENS 名称。