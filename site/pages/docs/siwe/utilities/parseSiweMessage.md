---
description: 解析 EIP-4361 格式的消息为消息字段对象。
---

# parseSiweMessage

解析 [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 格式的消息为消息字段对象。

## 导入

```ts twoslash
import { parseSiweMessage } from 'viem/siwe'
```

## 用法

```ts twoslash
import { parseSiweMessage } from 'viem/siwe'

const message = `example.com wants you to sign in with your Ethereum account:
0xA0Cf798816D4b9b9866b5330EEa46a18382f251e

I accept the ExampleOrg Terms of Service: https://example.com/tos

URI: https://example.com/path
Version: 1
Chain ID: 1
Nonce: foobarbaz
Issued At: 2023-02-01T00:00:00.000Z`
const fields = parseSiweMessage(message)
fields.address
//     ^?



```

## 返回

`SiweMessage`

EIP-4361 字段对象

## 参数

### message

- **类型:** `string`

EIP-4361 格式的消息