---
description: 哈希 ENS 标签。
---

# labelhash

哈希 ENS 标签。

## 导入

```ts
import { labelhash, normalize } from 'viem/ens'
```

## 用法

```ts
import { labelhash, normalize } from 'viem/ens'

labelhash(normalize('awkweb')) // [!code focus:2]
// '0x7aaad03ddcacc63166440f59c14a1a2c97ee381014b59c58f55b49ab05f31a38'
```

:::warning
由于 ENS 名称禁止某些禁止字符（例如下划线）并具有其他验证规则，因此在将其传递给 `labelhash` 之前，你可能希望使用 [UTS-46 规范化](https://unicode.org/reports/tr46) 来 [规范化 ENS 标签](https://docs.ens.domains/contract-api-reference/name-processing#normalising-names)。你可以使用内置的 [`normalize`](/docs/ens/utilities/normalize) 函数来实现这一点。
:::

## 返回值

`string`

哈希后的 ENS 标签。

## 参数

### name

- **类型:** `string`

一个 ENS 标签。