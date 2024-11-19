---
description: 将 ENS 名称标准化为 UTS46。
---

# normalize

将 ENS 名称标准化为 [UTS51](https://unicode.org/reports/tr51) 和 [ENSIP-15](https://github.com/ensdomains/docs/blob/9edf9443de4333a0ea7ec658a870672d5d180d53/ens-improvement-proposals/ensip-15-normalization-standard.md)。

内部使用 [`@adraffy/ens-normalize`](https://github.com/adraffy/ens-normalize.js)。

## 导入

```ts
import { normalize } from 'viem/ens'
```

## 用法

```ts
import { normalize } from 'viem/ens'

normalize('wagmi-d𝝣v.eth') // [!code focus:2]
// 'wagmi-dξv.eth'
```

## 返回值

`string`

标准化后的 ENS 标签。

## 参数

### name

- **类型:** `string`

一个 ENS 名称。