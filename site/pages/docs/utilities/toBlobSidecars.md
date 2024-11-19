---
description: 将任意数据转换为 blob 边车。
---

# toBlobSidecars

将任意数据（或 blobs、承诺和证明）转换为 blob 边车数组。

## 导入

```ts twoslash
import { toBlobSidecars } from 'viem'
```

## 用法

### 使用任意数据

你可以从任意数据生成 blob 边车，而无需先计算 blobs、承诺和证明（这些在内部完成）。

:::code-group

```ts twoslash [example.ts]
import { toBlobSidecars } from 'viem'
import { kzg } from './kzg'

const sidecars = toBlobSidecars({ data: '0x...', kzg }) // [!code focus]
```

```ts twoslash [kzg.ts] filename="kzg.ts"
// @noErrors
import * as kzg from 'c-kzg'
import { setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

export const kzg = setupKzg(cKzg, mainnetTrustedSetupPath)
```

:::

### 使用 Blobs、承诺和证明

或者，你可以使用更低级的 API，直接插入 blobs、承诺和证明。

:::code-group

```ts twoslash [example.ts]
import { 
  blobsToCommitments, 
  blobsToProofs,
  toBlobSidecars, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' })
const commitments = blobsToCommitments({ blobs, kzg })
const proofs = blobsToProofs({ blobs, commitments, kzg })
const sidecars = toBlobSidecars({ blobs, commitments, proofs }) // [!code focus]
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

`BlobSidecars`

从输入数据生成的 blob 边车。

## 参数

### blobs

- **类型：** `Hex[] | ByteArray[]`

要转换为 blob 边车的 blobs。

```ts twoslash
import { 
  blobsToCommitments, 
  blobsToProofs,
  toBlobSidecars, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' }) // [!code focus]
const commitments = blobsToCommitments({ blobs, kzg })
const proofs = blobsToProofs({ blobs, commitments, kzg })

const sidecars = toBlobSidecars({ 
  blobs, // [!code focus]
  commitments,
  proofs,
})
```

### commitments

- **类型：** `Hex[] | ByteArray[]`

与输入 blobs 对应的承诺。

```ts twoslash
import { 
  blobsToCommitments, 
  blobsToProofs,
  toBlobSidecars, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' })
const commitments = blobsToCommitments({ blobs, kzg }) // [!code focus]
const proofs = blobsToProofs({ blobs, commitments, kzg })

const sidecars = toBlobSidecars({ 
  blobs,
  commitments, // [!code focus]
  proofs,
})
```

### data

- **类型：** `Hex | ByteArray`

要转换为 blob 边车的数据。

```ts twoslash
import { toBlobSidecars } from 'viem'
import { kzg } from './kzg'

const sidecars = toBlobSidecars({ 
  data: '0x...', // [!code focus]
  kzg,
})
```

### kzg

- **类型：** `KZG`

KZG 实现。有关更多信息，请参见 [`setupKzg`](/docs/utilities/setupKzg)。

```ts twoslash
// @noErrors
import * as kzg from 'c-kzg'
import { toBlobSidecars, setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) // [!code focus]

const sidecars = toBlobSidecars({ 
  data: '0x...',
  kzg, // [!code focus]
}) 
```

### proofs

- **类型：** `Hex[] | ByteArray[]`

与输入 blobs 对应的证明。

```ts twoslash
import { 
  blobsToCommitments, 
  blobsToProofs,
  toBlobSidecars, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' })
const commitments = blobsToCommitments({ blobs, kzg })
const proofs = blobsToProofs({ blobs, commitments, kzg }) // [!code focus]

const sidecars = toBlobSidecars({ 
  blobs,
  commitments,
  proofs, // [!code focus]
})
```

### to

- **类型：** `"bytes" | "hex"`

输出类型。

```ts twoslash
import { defineKzg } from 'viem'
const kzg = defineKzg({} as any)

// ---cut---
import { toBlobSidecars, toBlobs } from 'viem'

const sidecars = toBlobSidecars({ 
  data: '0x1234',
  kzg, 
  to: 'bytes', // [!code focus]  
}) 

sidecars // [!code focus]
// ^?
```