# 费用 [在 Viem 中配置基于链的费用数据]

你可以通过使用链上的 `fees` 属性来修改费用的衍生方式。

## 用法

```tsx
import { defineChain } from 'viem'

export const example = defineChain({
  /* ... */
  fees: { 
    baseFeeMultiplier: 1.2, 
    defaultPriorityFee: parseGwei('0.01'), 
  } 
})
```

## API

### `fees.baseFeeMultiplier`

- **类型**: `number`
- **默认值**: `1.2`

用于考虑费用波动的费用乘数。用于 [`estimateFeesPerGas` 操作](/docs/actions/public/estimateFeesPerGas) 以最新区块的每单位 gas 基础费用来推导最终的 `maxFeePerGas`（EIP-1193），或 gas 价格来推导最终的 `gasPrice`（传统）。

**参数**

- `block`: 最新区块。
- `client`: 客户端实例。
- `request`: 交易请求（如果存在）。

```ts
import { defineChain } from 'viem'

const example = defineChain({ 
  /* ... */
  fees: { // [!code focus:8]
    baseFeeMultiplier: 1.2,
    // 或
    async baseFeeMultiplier({ block, request }) {
      // 一些异步工作
      return // ...
    },
  },
})
```

### `fees.defaultPriorityFee`

- **类型**: `number | ((args: FeesFnParameters) => Promise<bigint> | bigint)`

在发送交易时，当未定义优先费用时使用的默认 `maxPriorityFeePerGas`。

还会覆盖 [`estimateMaxPriorityFeePerGas` 操作](/docs/actions/public/estimateMaxPriorityFeePerGas) 和 [`estimateFeesPerGas`](/docs/actions/public/estimateFeesPerGas) 中的 `maxPriorityFeePerGas` 值的返回值。

**参数**

- `block`: 最新区块。
- `client`: 客户端实例。
- `request`: 交易请求（如果存在）。

```ts
import { defineChain } from 'viem'

const example = defineChain({
  /* ... */
  fees: { // [!code focus:8]
    defaultPriorityFee: parseGwei('0.01'),
    // 或
    async defaultPriorityFee({ block, request }) {
      // 一些异步工作
      return // ...
    },
  },
})
```

### `fees.estimateFeesPerGas`

- **类型**: `(args: FeesFnParameters) => Promise<EstimateFeesPerGasResponse>`

允许自定义每单位 gas 的费用值（即 `maxFeePerGas`、`maxPriorityFeePerGas`、`gasPrice`）。

还会覆盖 [`estimateFeesPerGas`](/docs/actions/public/estimateFeesPerGas) 中的返回值。

**参数**

- `block`: 最新区块。
- `client`: 客户端实例。
- `multiply`: 一个函数，用于将 `baseFeeMultiplier` 应用到提供的值。
- `request`: 交易请求（如果存在）。
- `type`: 交易类型（即 `legacy` 或 `eip1559`）。

```ts
import { defineChain } from 'viem'

const example = defineChain({
  /* ... */
  fees: { // [!code focus:13]
    async estimateFeesPerGas({ client, multiply, type }) {
      const gasPrice = // ...
      const baseFeePerGas = // ...
      const maxPriorityFeePerGas = // ...

      if (type === 'legacy') return { gasPrice: multiply(gasPrice) }
      return {
        maxFeePerGas: multiply(baseFeePerGas) + maxPriorityFeePerGas,
        maxPriorityFeePerGas
      },
    },
  },
})
```