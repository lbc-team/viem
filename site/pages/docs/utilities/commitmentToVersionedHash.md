---
description: 将承诺转换为其版本化哈希。
---

# commitmentToVersionedHash

将承诺转换为其版本化哈希。

## 导入

```ts twoslash
import { commitmentToVersionedHash } from 'viem'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { 
  blobsToCommitments, 
  commitmentToVersionedHash, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'

const blobs = toBlobs({ data: '0x1234' })
const [commitment] = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentToVersionedHash({  // [!code focus]
  commitment,  // [!code focus]
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

`Hex | ByteArray`

与承诺对应的版本化哈希。

## 参数

### commitment

- **类型:** `Hex | ByteArray`

要转换为版本化哈希的承诺。

```ts twoslash
import { 
  blobsToCommitments, 
  commitmentToVersionedHash, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'
// ---cut---
const blobs = toBlobs({ data: '0x1234' })
const [commitment] = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentToVersionedHash({ 
  commitment,  // [!code focus]
})
```

### to

- **类型:** `"bytes" | "hex"`

输出类型。

```ts twoslash
import { 
  blobsToCommitments, 
  commitmentToVersionedHash, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'
// ---cut---
const blobs = toBlobs({ data: '0x1234' })
const [commitment] = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentToVersionedHash({ 
  commitment, 
  to: 'bytes' // [!code focus]
})
versionedHashes // [!code focus]
//  ^?


```

### version

- **类型:** `number`
- **默认:** `1`

要标记到哈希上的版本。默认为 `1`。

```ts twoslash
import { 
  blobsToCommitments, 
  commitmentToVersionedHash, 
  toBlobs 
} from 'viem'
import { kzg } from './kzg'
// ---cut---
const blobs = toBlobs({ data: '0x1234' })
const [commitment] = blobsToCommitments({ blobs, kzg })
const versionedHashes = commitmentToVersionedHash({ 
  commitment, 
  version: 69, // [!code focus]
})
```