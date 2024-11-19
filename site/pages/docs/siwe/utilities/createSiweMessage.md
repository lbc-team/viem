---
description: 创建 EIP-4361 格式的消息。
---

# createSiweMessage

创建 [EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) 格式的消息。

## 导入

```ts twoslash
import { createSiweMessage } from 'viem/siwe'
```

## 用法

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
})
```

## 返回

`string`

EIP-4361 格式的消息。

## 参数

### address

- **类型:** `Address`

执行签名的以太坊地址。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // [!code focus]
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
})
```

### chainId

- **类型:** `number`

与会话绑定的 [EIP-155](https://eips.ethereum.org/EIPS/eip-155) 链 ID。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  chainId: 1, // [!code focus]
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
})
```

### domain

- **类型:** `string`

请求签名的 [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) 权限。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com', // [!code focus]
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
})
```

### nonce

- **类型:** `string`

通常由依赖方选择的随机字符串，用于防止重放攻击。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz', // [!code focus]
  uri: 'https://example.com/path',
  version: '1',
})
```

### uri

- **类型:** `string`

指向签名主题的 [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986) URI（如声明的主题）。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path', // [!code focus]
  version: '1',
})
```

### version

- **类型:** `'1'`

SIWE 消息的当前版本。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1', // [!code focus]
})
```

### expirationTime (可选)

- **类型:** `Date`

签名的认证消息不再有效的时间。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  expirationTime: new Date(),  // [!code focus]
})
```

### issuedAt (可选)

- **类型:** `Date`

消息生成的时间，通常是当前时间。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  issuedAt: new Date(),  // [!code focus]
})
```

### notBefore (可选)

- **类型:** `Date`

签名的认证消息何时变为有效的时间。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  notBefore: new Date(),  // [!code focus]
})
```

### requestId (可选)

- **类型:** `string`

一个系统特定的标识符，可用于唯一引用登录请求。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  requestId: '123e4567-e89b-12d3-a456-426614174000', // [!code focus]
})
```

### resources (可选)

- **类型:** `string[]`

用户希望在依赖方的认证过程中解决的信息或信息引用的列表。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  resources: [ // [!code focus]
    'https://example.com/foo', // [!code focus]
    'https://example.com/bar', // [!code focus]
    'https://example.com/baz', // [!code focus]
  ], // [!code focus]
})
```

### scheme (可选)

- **类型:** `string`

请求来源的 [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986#section-3.1) URI 方案。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  scheme: 'https', // [!code focus]
})
```

### statement (可选)

- **类型:** `string`

用户将签署的人类可读 ASCII 断言。

```ts twoslash
import { createSiweMessage } from 'viem/siwe'

const message = createSiweMessage({
  address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
  chainId: 1,
  domain: 'example.com',
  nonce: 'foobarbaz',
  uri: 'https://example.com/path',
  version: '1',
  statement: '我接受 ExampleOrg 服务条款: https://example.com/tos', // [!code focus]
})
```