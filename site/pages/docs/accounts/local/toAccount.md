# toAccount [创建自定义账户的函数]

从自定义签名实现创建一个账户

## 导入

```ts
import { toAccount } from 'viem/accounts'
```

## 用法

```ts
import { 
  signMessage, 
  signTransaction, 
  signTypedData, 
  privateKeyToAddress,
  toAccount 
} from 'viem/accounts'

const privateKey = '0x...'

const account = toAccount({ // [!code focus:15]
  address: getAddress(privateKey),

  async signMessage({ message }) {
    return signMessage({ message, privateKey })
  },

  async signTransaction(transaction, { serializer }) {
    return signTransaction({ privateKey, transaction, serializer })
  },

  async signTypedData(typedData) {
    return signTypedData({ ...typedData, privateKey })
  },
})
```

## 参数

### address

- **类型:** `Address`

账户的地址。

```ts
const account = toAccount({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // [!code focus]
  async signMessage({ message }) {
    return signMessage({ message, privateKey })
  },
  async signTransaction(transaction, { serializer }) {
    return signTransaction({ privateKey, transaction, serializer })
  },
  async signTypedData(typedData) {
    return signTypedData({ ...typedData, privateKey })
  },
})
```

### signMessage

用于签署 [EIP-191 格式](https://eips.ethereum.org/EIPS/eip-191) 消息的函数。

```ts
const account = toAccount({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',

  async signMessage({ message }) { // [!code focus:3]
    return signMessage({ message, privateKey })
  },
  async signTransaction(transaction, { serializer }) {
    return signTransaction({ privateKey, transaction, serializer })
  },
  async signTypedData(typedData) {
    return signTypedData({ ...typedData, privateKey })
  },
})
```

### signTransaction

用于签署交易的函数。

```ts
const account = toAccount({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  async signMessage({ message }) {
    return signMessage({ message, privateKey })
  },
  async signTransaction(transaction, { serializer }) {  // [!code focus:3]
    return signTransaction({ privateKey, transaction, serializer })
  },
  async signTypedData(typedData) {
    return signTypedData({ ...typedData, privateKey })
  },
})
```

### signTypedData

用于签署 [EIP-712](https://eips.ethereum.org/EIPS/eip-712) 类型数据的函数。

```ts
const account = toAccount({
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  async signMessage({ message }) {
    return signMessage({ message, privateKey })
  },
  async signTransaction(transaction, { serializer }) {
    return signTransaction({ privateKey, transaction, serializer })
  },
  async signTypedData(typedData) {  // [!code focus:3]
    return signTypedData({ ...typedData, privateKey })
  },
})
```