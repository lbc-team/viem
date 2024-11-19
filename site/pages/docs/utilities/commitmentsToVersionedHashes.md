---
description: 将承诺列表转换为其版本化哈希。
---

# commitmentsToVersionedHashes

将承诺列表转换为其版本化哈希。

## 导入

```ts twoslash
import { commitmentsToVersionedHashes } from 'viem'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { 
  blobsToCommitments, 
  commitmentsToVersionedHashes, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x1234' })
const commitments = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentsToVersionedHashes({  // [!code focus]
  commitments,  // [!code focus]
}) // [!code focus]
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

与输入承诺对应的版本化哈希列表。

## 参数

### commitments

- **类型:** `Hex[] | ByteArray[]`

要转换为版本化哈希的承诺列表。

```ts twoslash
import { 
  blobsToCommitments, 
  commitmentsToVersionedHashes, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'
// ---cut---
const blobs = toBlobs({ data: '0x1234' })
const commitments = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentsToVersionedHashes({ 
  commitments,  // [!code focus]
  kzg, 
})
```

### to

- **类型:** `"bytes" | "hex"`

输出类型。

```ts twoslash
import { 
  blobsToCommitments, 
  commitmentsToVersionedHashes, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'
// ---cut---
const blobs = toBlobs({ data: '0x1234' })
const commitments = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentsToVersionedHashes({ 
  commitments, 
  to: 'bytes' // [!code focus]
})
versionedHashes // [!code focus]
//  ^?


```

### version

- **类型:** `number`
- **默认值:** `1`

要标记到哈希上的版本。默认为 `1`。

```ts twoslash
import { 
  blobsToCommitments, 
  commitmentsToVersionedHashes, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'
// ---cut---
const blobs = toBlobs({ data: '0x1234' })
const commitments = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentsToVersionedHashes({ 
  commitments, 
  version: 69, // [!code focus]
})
```