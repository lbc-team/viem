---
description: 计算一组 blobs 及其承诺的证明。
---

# blobsToProofs

计算一组 blobs 及其承诺的证明。

## 导入

```ts twoslash
import { blobsToProofs } from 'viem'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { blobsToCommitments, blobsToProofs, toBlobs } from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' })
const commitments = blobsToCommitments({ blobs, kzg })
const proofs = blobsToProofs({ blobs, commitments, kzg }) // [!code focus]
```

```ts twoslash [kzg.ts] filename="kzg.ts"
// @noErrors
import * as kzg from 'c-kzg'
import { setupKzg } from 'viem'

export const kzg = setupKzg('./trusted-setup.json', cKzg)
```

:::

## 返回

`Hex[] | ByteArray[]`

来自输入 blobs 和承诺的证明。

## 参数

### blobs

- **类型:** `Hex[] | ByteArray[]`

要转换为证明的 blobs。

```ts twoslash
import { blobsToCommitments, blobsToProofs, toBlobs } from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' }) // [!code focus]
const commitments = blobsToCommitments({ blobs, kzg })

const proofs = blobsToProofs({ 
  blobs, // [!code focus]
  commitments, 
  kzg 
})
```

### commitments

- **类型:** `Hex[] | ByteArray[]`

与输入 blobs 对应的承诺。

```ts twoslash
import { blobsToCommitments, blobsToProofs, toBlobs } from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x...' })
const commitments = blobsToCommitments({ blobs, kzg }) // [!code focus]

const proofs = blobsToProofs({ 
  blobs,
  commitments,  // [!code focus]
  kzg 
})
```

### kzg

- **类型:** `KZG`

KZG 实现。有关更多信息，请参见 [`setupKzg`](/docs/utilities/setupKzg)。

```ts twoslash
// @noErrors
import * as kzg from 'c-kzg'
import { blobsToProofs, setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

const blobs = toBlobs({ data: '0x...' })
const commitments = blobsToCommitments({ blobs, kzg })
const kzg = setupKzg(cKzg, mainnetTrustedSetupPath) // [!code focus]

const proofs = blobsToProofs({ 
  blobs,
  commitments,
  kzg, // [!code focus]
}) 
```