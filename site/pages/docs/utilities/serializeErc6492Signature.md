---
description: 将 ERC-6492 风格的签名序列化为十六进制格式。
---

# serializeErc6492Signature

将 [ERC-6492](https://eips.ethereum.org/EIPS/eip-6492) 风格的签名序列化为十六进制格式。

## 导入

```ts
import { serializeErc6492Signature } from 'viem/experimental'
```

## 用法

```ts twoslash
import { serializeErc6492Signature } from 'viem/experimental'

serializeErc6492Signature({ // [!code focus:99]
  address: '0xcafebabecafebabecafebabecafebabecafebabe',
  data: '0xdeadbeef',
  signature: '0x41a461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b',
})
// "0x000000000000000000000000cafebabecafebabecafebabecafebabecafebabe000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000004deadbeef000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041a461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b000000000000000000000000000000000000000000000000000000000000006492649264926492649264926492649264926492649264926492649264926492"
```

## 返回

[`Hex`](/docs/glossary/types#hex)

十六进制格式的签名。

## 参数

### address

- **类型:** `Address`

用于反事实验证的 ERC-4337 账户工厂或准备地址。

### data

- **类型:** `Hex`

用于部署 ERC-4337 账户（如果尚未部署）以进行反事实验证的 calldata。

### signature

- **类型:** `Hex`

原始签名。