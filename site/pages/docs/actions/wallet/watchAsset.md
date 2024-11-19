---
description: 请求用户在其钱包中跟踪代币。
---

# watchAsset

请求用户在其钱包中跟踪代币。返回一个布尔值，指示代币是否成功添加。

## 用法

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './client'
 
const success = await walletClient.watchAsset({ // [!code focus:99]
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH',
  },
})
```

```ts twoslash [client.ts] filename="client.ts"
// [!include ~/snippets/walletClient.ts]
```

:::

## 返回值

`boolean`

布尔值，指示代币是否成功添加。

## 参数

### type

- **类型:** `string`

代币类型。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut--
const success = await walletClient.watchAsset({
  type: 'ERC20', // [!code focus]
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH',
  },
});
```

### options.address

- **类型:** [`Address`](/docs/glossary/types#address)

代币合约的地址。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const success = await walletClient.watchAsset({
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // [!code focus]
    decimals: 18,
    symbol: 'WETH',
  },
});
```

### options.decimals

- **类型:** `number`

代币的小数位数。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const success = await walletClient.watchAsset({
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18, // [!code focus]
    symbol: 'WETH',
  },
});
```

### options.symbol

- **类型:** `string`

一个最多 11 个字符的代号或简称。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const success = await walletClient.watchAsset({
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH', // [!code focus]
  }
})
```

### options.image

- **类型:** `string`

代币 logo 的字符串 URL。

```ts twoslash
// [!include ~/snippets/walletClient.ts]
// ---cut---
const success = await walletClient.watchAsset({
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH',
    image: 'https://weth.com/icon.png', // [!code focus]
  }
})
```

## JSON-RPC 方法

[`wallet_watchAsset`](https://eips.ethereum.org/EIPS/eip-747)