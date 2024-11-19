---
description: 从一组 blobs 计算承诺。
---

# blobsToCommitments

从一组 blobs 计算承诺。

## 导入

```ts twoslash
import { blobsToCommitments } from 'viem'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { blobsToCommitments, toBlobs } from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x1234' })
const commitments = blobsToCommitments({ blobs, kzg }) // [!code focus]
```

```ts twoslash [kzg.ts] filename="kzg.ts"
// @noErrors
import * as kzg from 'c-kzg'
import { setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

export const kzg = setupKzg(cKzg, mainnetTrustedSetupPath)
```

:::

## 返回

`Hex[] | ByteArray[]`

与输入 blobs 对应的承诺列表。

## 参数

### blobs

- **类型:** `Hex[] | ByteArray[]`

要转换为承诺的 blobs 列表。

```ts twoslash
import { defineKzg } from 'viem'
const kzg = defineKzg({} as any)

// ---cut---
import { blobsToCommitments, toBlobs } from 'viem'

const commitments = blobsToCommitments({ 
  blobs: toBlobs({ data: '0x1234' }), // [!code focus]  
  kzg, 
}) 
```

### kzg

- **类型:** `KZG`

KZG 实现。有关更多信息，请参见 [`setupKzg`](/docs/utilities/setupKzg)。

```ts twoslash
// @noErrors
import * as kzg from 'c-kzg'
import { blobsToCommitments, setupKzg, toBlobs } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) // [!code focus]

const commitments = blobsToCommitments({ 
  blobs: toBlobs({ data: '0x1234' }),  
  kzg, // [!code focus]
}) 
```

### to

- **类型:** `"bytes" | "hex"`

输出类型。

```ts twoslash
import { defineKzg } from 'viem'
const kzg = defineKzg({} as any)

// ---cut---
import { blobsToCommitments, toBlobs } from 'viem'

const commitments = blobsToCommitments({ 
  blobs: toBlobs({ data: '0x1234' }),
  kzg, 
  to: 'bytes', // [!code focus]  
}) 

commitments // [!code focus]
// ^?


```