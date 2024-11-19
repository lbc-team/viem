# 格式化器 [在 Viem 中配置基于链的格式化器]

你可以通过使用链上的 `formatters` 属性来修改区块和交易的格式。

这对于具有不同区块或交易结构的链（例如 Celo 和 OP Stack 链）非常有用。

## 用法

```tsx
import { 
  defineBlock,
  defineChain,
  defineTransaction, 
  defineTransactionReceipt, 
  defineTransactionRequest 
} from 'viem' 

export const example = defineChain({
  /* ... */
  formatters: { 
    block: defineBlock(/* ... */),
    transaction: defineTransaction(/* ... */),
    transactionReceipt: defineTransactionReceipt(/* ... */),
    transactionRequest: defineTransactionRequest(/* ... */),
  } 
})
```

## API

### `formatters.block`

你可以通过使用链上的 `formatters.block` 属性来修改区块的格式。

你可以将区块覆盖传递给 `defineBlock` 的 `format` 函数，或者将整个区块本身传递。你还可以使用 `exclude` 排除某些属性。

```ts
import { defineBlock, defineChain, hexToBigInt } from 'viem'

type RpcBlockOverrides = { // [!code focus:6]
  secondaryFee: `0x${string}`
}
type BlockOverrides = {
  secondaryFee: bigint
}

const example = defineChain({
  /* ... */
  formatters: { // [!code focus:10]
    block: defineBlock({
      exclude: ['difficulty'],
      format(args: RpcBlockOverrides): BlockOverrides {
        return {
          secondaryFee: hexToBigInt(args.secondaryFee)
        }
      },
    }),
  },
})

const block = await client.getBlock() // [!code focus:2]
//    ^? { ..., difficulty: never, secondaryFee: bigint, ... }
```

### `formatters.transaction`

你可以通过使用链上的 `formatters.transaction` 属性来修改交易的格式。

你可以将交易覆盖传递给 `defineTransaction` 的 `format` 函数，或者将整个交易本身传递。你还可以使用 `exclude` 排除某些属性。

```ts
import { defineTransaction, defineChain, hexToBigInt } from 'viem'

type RpcTransactionOverrides = { // [!code focus:6]
  mint: `0x${string}`
}
type TransactionOverrides = {
  mint: bigint
}

const example = defineChain({
  /* ... */
  formatters: { // [!code focus:10]
    transaction: defineTransaction({
      exclude: ['gasPrice'],
      format(args: RpcTransactionOverrides): TransactionOverrides {
        return {
          mint: hexToBigInt(args.mint)
        }
      },
    }),
  },
})

const transaction = await client.getTransaction({ hash: '0x...' }) // [!code focus:2]
//    ^? { ..., gasPrice: never, mint: bigint, ... }
```

### `formatters.transactionReceipt`

你可以通过使用链上的 `formatters.transactionReceipt` 属性来修改交易收据的格式。

你可以将交易收据覆盖传递给 `defineTransactionReceipt` 的 `format` 函数，或者将整个交易收据本身传递。你还可以使用 `exclude` 排除某些属性。

```ts
import { defineTransactionReceipt, defineChain, hexToBigInt } from 'viem'

type RpcTransactionReceiptOverrides = { // [!code focus:6]
  l1Fee: `0x${string}`
}
type TransactionReceiptOverrides = {
  l1Fee: bigint
}

const example = defineChain({
  /* ... */
  formatters: { // [!code focus:11]
    transactionReceipt: defineTransactionReceipt({
      exclude: ['effectiveGasPrice'],
      format(args: RpcTransactionReceiptOverrides): 
        TransactionReceiptOverrides {
        return {
          l1Fee: hexToBigInt(args.l1Fee)
        }
      },
    }),
  },
})

const receipt = await client.getTransactionReceipt({ hash: '0x...' }) // [!code focus:2]
//    ^? { ..., effectiveGasPrice: never, l1Fee: bigint, ... }
```

### `formatters.transactionRequest`

你可以通过使用链上的 `formatters.transactionRequest` 属性来修改交易请求的格式。

你可以将交易请求覆盖传递给 `defineTransactionRequest` 的 `format` 函数，或者将整个交易请求本身传递。你还可以使用 `exclude` 排除某些属性。

```ts
import { defineTransactionRequest, defineChain, hexToBigInt } from 'viem'

type RpcTransactionRequestOverrides = { // [!code focus:6]
  secondaryFee: `0x${string}`
}
type TransactionRequestOverrides = {
  secondaryFee: bigint
}

const example = defineChain({
  /* ... */
  formatters: { // [!code focus:11]
    transactionRequest: defineTransactionRequest({
      exclude: ['effectiveGasPrice'],
      format(args: TransactionRequestOverrides): 
        RpcTransactionRequestOverrides {
        return {
          secondaryFee: numberToHex(args.secondaryFee)
        }
      },
    }),
  },
})

const receipt = await client.getTransactionReceipt({ hash: '0x...' }) // [!code focus:2]
//    ^? { ..., effectiveGasPrice: never, l1Fee: bigint, ... }
```