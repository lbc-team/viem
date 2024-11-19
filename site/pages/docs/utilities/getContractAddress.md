---
description: 检索合约地址。
---

# getContractAddress

检索由 [`CREATE`](https://ethereum.stackexchange.com/a/68945) 或 [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) 操作码生成的合约地址 – 在将合约部署到网络后调用。

## 导入

```ts
import { getContractAddress } from 'viem'
```

## 用法

```ts
import { getContractAddress } from 'viem'

getContractAddress({ // [!code focus:99]
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
  nonce: 69420n
})
// '0xDf2e056f7062790dF95A472f691670717Ae7b1B6'
```

## 返回

[`Address`](/docs/glossary/types#address)

合约地址。

## 参数

### from (可选)

- **类型:** [`Address`](/docs/glossary/types#address)

合约部署来源的地址。

```ts
getContractAddress({
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b', // [!code focus:1]
  nonce: 69420n
})
```

### nonce (可选)

- **类型:** [`Address`](/docs/glossary/types#address)

部署合约的交易的 nonce。

```ts
getContractAddress({
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
  nonce: 69420n // [!code focus:1]
})
```

### opcode (可选)

- **类型:** `"CREATE" | "CREATE2"`
- **默认:** `"CREATE"`

用于调用合约部署的操作码。默认为 `"CREATE"`。

[了解更多关于 `CREATE2`](https://eips.ethereum.org/EIPS/eip-1014)。

```ts
getContractAddress({
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
  opcode: 'CREATE2', // [!code focus:1]
  salt: toBytes('wagmi'),
})
```

### bytecode (可选)

- **类型:** `ByteArray` | [`Hex`](/docs/glossary/types#hex)
- **仅适用于 `opcode: 'CREATE2'` 部署**

待部署合约的字节码。

```ts
getContractAddress({
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...', // [!code focus:1]
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
  opcode: 'CREATE2',
  salt: toBytes('wagmi'),
})
```

### bytecodeHash (可选)

- **类型:** `ByteArray` | [`Hex`](/docs/glossary/types#hex)
- **仅适用于 `opcode: 'CREATE2'` 部署**

待部署合约的字节码的哈希。

```ts
getContractAddress({
  bytecodeHash: '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54', // [!code focus:1]
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
  opcode: 'CREATE2',
  salt: toBytes('wagmi'),
})
```

### salt (可选)

- **类型:** `ByteArray` | [`Hex`](/docs/glossary/types#hex)
- **仅适用于 `opcode: 'CREATE2'` 部署**

发送方提供的任意值。

```ts
getContractAddress({
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
  from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
  opcode: 'CREATE2',
  salt: toBytes('wagmi'), // [!code focus:1]
})
```