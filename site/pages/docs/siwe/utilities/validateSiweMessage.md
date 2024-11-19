---
description: 验证 EIP-4361 消息。
---

# validateSiweMessage

验证 [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 消息。

## 导入

```ts twoslash
import { validateSiweMessage } from 'viem/siwe'
```

## 用法

```ts twoslash
import { validateSiweMessage } from 'viem/siwe'

const valid = validateSiweMessage({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
  message: {
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    chainId: 1,
    domain: 'example.com',
    nonce: 'foobarbaz',
    uri: 'https://example.com/path',
    version: '1',
  },
})
```

## 返回

`boolean`

消息字段是否有效。

## 参数

### message

- **类型:** `Partial<SiweMessage>`

EIP-4361 消息字段。

### address（可选）

- **类型:** `string`

要检查的以太坊地址。

### domain（可选）

- **类型:** `string`

[RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) 权限以进行检查。

### nonce（可选）

- **类型:** `string`

要检查的随机字符串。

### scheme（可选）

- **类型:** `string`

[RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) URI 方案以进行检查。

### time（可选）

- **类型:** `Date`
- **默认:** `new Date()`

当前时间以检查可选的 [`expirationTime`](http://localhost:5173/docs/siwe/utilities/createSiweMessage#expirationtime-optional) 和 [`notBefore`](/docs/siwe/utilities/createSiweMessage#notbefore-optional) 消息字段。