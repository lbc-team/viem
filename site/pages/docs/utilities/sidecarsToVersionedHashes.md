---
description: 将侧车列表转换为其版本哈希。
---

# sidecarsToVersionedHashes

将侧车列表转换为其版本哈希。

## 导入

```ts twoslash
import { sidecarsToVersionedHashes } from 'viem'
```

## 用法

:::code-group

```ts twoslash [example.ts]
import { toBlobSidecars, sidecarsToVersionedHashes } from 'viem'
import { kzg } from './kzg'

const sidecars = toBlobSidecars({ data: '0x...', kzg })
const versionedHashes = sidecarsToVersionedHashes({ sidecars }) // [!code focus]
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

来自输入侧车的版本哈希。

## 参数

### sidecars

- **类型:** `BlobSidecars<Hex | ByteArray>`

要转换为版本哈希的侧车。

```ts twoslash 
import { toBlobSidecars, sidecarsToVersionedHashes } from 'viem'
import { kzg } from './kzg'

const sidecars = toBlobSidecars({ data: '0x...', kzg })

const versionedHashes = sidecarsToVersionedHashes({ 
  sidecars, // [!code focus]
})
```

### to

- **类型:** `"bytes" | "hex"`

与输入 blob 对应的承诺。

```ts twoslash 
import { toBlobSidecars, sidecarsToVersionedHashes } from 'viem'
import { kzg } from './kzg'

const sidecars = toBlobSidecars({ data: '0x...', kzg })

const versionedHashes = sidecarsToVersionedHashes({ 
  sidecars,
  to: 'bytes', // [!code focus]
})
versionedHashes  // [!code focus]
// ^?


```

### version

- **类型:** `number`
- **默认:** `1`

要标记到哈希上的版本。默认为 `1`。

```ts twoslash 
import { toBlobSidecars, sidecarsToVersionedHashes } from 'viem'
import { kzg } from './kzg'

const sidecars = toBlobSidecars({ data: '0x...', kzg })

const versionedHashes = sidecarsToVersionedHashes({ 
  sidecars,
  version: 69, // [!code focus]
})
```