---
description: 获取值的大小（以字节为单位）。
---

# size

获取值的大小（以字节为单位）。

## Install

```ts
import { size } from 'viem'
```

## Usage

```ts
import { size } from 'viem'

size('0xa4') // 1
size('0xa4e12a45') // 4
size(new Uint8Array([1, 122, 51, 123])) // 4
```

## Returns

`number`

值的大小（以字节为单位）。

## Parameters

### value

- **Type:** [`Hex`](/docs/glossary/types#hex) | `ByteArray`

要获取大小的值（十六进制或字节数组）。