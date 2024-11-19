---
description: 发送签名交易到网络
---

# sendRawTransaction

发送一个**签名**的交易到网络。可以与 [公共客户端](/docs/clients/public) 和 [钱包客户端](/docs/clients/wallet) 一起使用

## 用法

:::code-group

```ts twoslash [example.ts]
import { account, walletClient } from './config'
 
const request = await walletClient.prepareTransactionRequest({
  account,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n
})

const serializedTransaction = await walletClient.signTransaction(request)

const hash = await walletClient.sendRawTransaction({ serializedTransaction }) // [!code focus]
```

```ts twoslash [config.ts] filename="config.ts"
// [!include ~/snippets/walletClient.ts]

export const [account] = await walletClient.getAddresses()
// @log: ↑ JSON-RPC 账户

// export const account = privateKeyToAccount(...)
// @log: ↑ 本地账户
```

:::

## 返回

[`Hash`](/docs/glossary/types#hash)

[交易](/docs/glossary/terms#transaction) 哈希。

## 参数

### serializedTransaction

- **类型:** `Hex`

签名的序列化交易。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const signature = await walletClient.sendRawTransaction({
  serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33' // [!code focus]
})
```