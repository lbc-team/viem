# Blob 交易 [使用 Viem 发送你的第一个 Blob 交易]

Blob 交易是以太坊中的一种新型交易（在 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 中引入），允许你将 BLObs（二进制大型对象）广播到以太坊网络。Blob 交易与其他交易类似，但增加了携带 Blob 负载的能力。Blob 的大小远大于常规的 calldata（约 128kB），然而与常规的 calldata 不同，它们在 EVM 上不可访问。EVM 只能查看 Blob 的承诺。Blob 也是瞬态的，仅持续 4096 个纪元（约 18 天）。

要了解更多关于 Blob 交易和 EIP-4844 的信息，请查看以下资源：

- [EIP-4844 规范](https://eips.ethereum.org/EIPS/eip-4844)
- [EIP-4844 网站](https://www.eip4844.com/#faq)
- [EIP-4844 常见问题](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#Proto-Danksharding-FAQ)

在本指南中，我们将带你通过使用 Viem 发送你的第一个 Blob 交易。

::::steps

## 设置客户端

我们将首先设置我们的 Viem 客户端。

让我们创建一个 `client.ts` 文件来保存我们的客户端。

```ts twoslash [client.ts] filename="client.ts"
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

export const account = privateKeyToAccount('0x...')

export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
})
```

## 安装 KZG 绑定

接下来，我们需要安装一些 KZG 绑定。KZG 将用于计算 Blob 的承诺，并从 Blob 和承诺中生成证明。承诺和证明在我们发送 Blob 交易之前是序列化和签名所必需的。

我们推荐的几个 KZG 实现是：
- [c-kzg](https://github.com/ethereum/c-kzg-4844)：Node.js 对 c-kzg 的绑定。
- [kzg-wasm](https://github.com/ethereumjs/kzg-wasm)：WebAssembly 对 c-kzg 的绑定。

:::code-group

```bash [npm]
npm i c-kzg
# 或
npm i kzg-wasm
```

```bash [pnpm]
pnpm i c-kzg
# 或
pnpm i kzg-wasm
```

```bash [bun]
bun i c-kzg
# 或
bun i kzg-wasm
```

:::

## 设置 KZG 接口

之后，我们需要将 KZG 绑定连接到 Viem。

让我们创建一个 `kzg.ts` 文件来保存我们的 KZG 接口。

:::code-group

```ts twoslash [kzg.ts] filename="kzg.ts"
import * as cKzg from 'c-kzg'
import { setupKzg } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'

export const kzg = setupKzg(cKzg, mainnetTrustedSetupPath)
```

```ts twoslash [client.ts]
// [!include client.ts]
```

:::

## 发送 Blob 交易

现在我们已经设置了客户端和 KZG 接口，我们可以发送我们的第一个 Blob 交易。

为了演示，我们将构造一个包含简单字符串的 Blob：“hello world”，并将其发送到零地址。

:::code-group

```ts twoslash [example.ts]
import { parseGwei, stringToHex, toBlobs } from 'viem'
import { account, client } from './client'
import { kzg } from './kzg'

const blobs = toBlobs({ data: stringToHex('hello world') })

const hash = await client.sendTransaction({
  blobs,
  kzg,
  maxFeePerBlobGas: parseGwei('30'),
  to: '0x0000000000000000000000000000000000000000',
})
```

```ts twoslash [kzg.ts]
// [!include kzg.ts]
```

```ts twoslash [client.ts]
// [!include client.ts]
```

:::

::::

## 就这样！

你刚刚使用 Viem 发送了你的第一个 Blob 交易。

使用你在第 4 步中收到的 `hash`，你现在可以在像 [Blobscan](https://blobscan.com/) 这样的 Blob 浏览器上跟踪你的 Blob 交易。