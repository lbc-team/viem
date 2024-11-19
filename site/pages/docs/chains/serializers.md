# 序列化器 [在 Viem 中配置基于链的序列化器]

## 用法

```ts
import { defineChain, serializeTransaction } from 'viem'

const example = defineChain({
  /* ... */
  serializers: {
    transaction(transaction, signature) {
      return serializeTransaction(transaction, signature)
    },
  },
})
```

## API

### `serializers.transaction`

- **类型**: `(transaction: Transaction, signature?: Signature) => "0x${string}"`

你可以通过在链上使用 `serializers.transaction` 属性来修改交易的序列化方式。

**参数**

- `transaction`: 要序列化的交易。
- `signature`: 交易签名（如果存在）。

```ts
import { defineChain, serializeTransaction } from 'viem'

const example = defineChain({
  /* ... */
  serializers: { // [!code focus:5]
    transaction(transaction, signature) {
      return serializeTransaction(transaction, signature)
    },
  },
})
```