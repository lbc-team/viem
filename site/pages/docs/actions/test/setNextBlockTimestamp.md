---
description: 设置下一个区块的时间戳。
---

# setNextBlockTimestamp

设置下一个区块的时间戳。

## 用法

:::code-group

```ts [example.ts]
import { testClient } from './client'
 
await testClient.setNextBlockTimestamp({ // [!code focus:4]
  timestamp: 1671744314n
})
```

```ts [client.ts]
import { createTestClient, http } from 'viem'
import { foundry } from 'viem/chains'

export const testClient = createTestClient({
  chain: foundry,
  mode: 'anvil',
  transport: http(), 
})
```

:::

## 参数

### timestamp

- **类型:** `bigint`

```ts
await testClient.setNextBlockTimestamp({
  timestamp: 1671744314n // [!code focus]
})
```

## 注意事项

- 下一个区块的 `timestamp` 不能小于当前区块的 `timestamp`。