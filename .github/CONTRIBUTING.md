# 贡献

感谢你对 Viem 的贡献兴趣！在提交拉取请求之前，请花一点时间查看此文档。

如果你想贡献，但不确定从哪里开始，可以创建一个 [新讨论](https://github.com/wevm/viem/discussions)。

如果你是为了向 `viem/chains` 添加新链而贡献，请阅读 [链部分](#chains)。

## 规则

1. 对 API 或实现的重大更改必须在创建拉取请求之前进行审查。首先创建一个 [功能请求](https://github.com/wevm/viem/discussions/new?category=ideas) 来讨论任何 API 更改或新想法。
2. 贡献者必须是人类，而不是机器人。
3. 贡献者的 GitHub 账户必须在其他仓库中至少有一次非琐碎的贡献。
4. 第一次贡献不得仅包含拼写或语法修正。

## 基本指南

本指南旨在帮助你开始贡献。通过遵循这些步骤，你将了解开发过程和工作流程。

1. [克隆仓库](#cloning-the-repository)
2. [安装 Node.js 和 pnpm](#installing-nodejs-and-pnpm)
3. [安装 Foundry](#installing-foundry)
4. [安装依赖](#installing-dependencies)
5. [运行测试套件](#running-the-test-suite)
6. [编写文档](#writing-documentation)
7. [提交拉取请求](#submitting-a-pull-request)
8. [版本控制](#versioning)

---

### 克隆仓库

要开始为项目贡献，请使用 git 将其克隆到本地计算机：

```bash
git clone https://github.com/wevm/viem.git --recurse-submodules
```

或者使用 [GitHub CLI](https://cli.github.com)：

```bash
gh repo clone wevm/viem -- --recurse-submodules
```

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 安装 Node.js 和 pnpm

Viem 使用 [pnpm workspaces](https://pnpm.io/workspaces) 来管理多个项目。你需要安装 **Node.js v22 或更高版本** 和 **pnpm v9.1.0 或更高版本**。

你可以在终端中运行以下命令来检查本地 Node.js 和 pnpm 版本：

```bash
node -v
pnpm -v
```

如果版本不正确或你没有安装 Node.js 或 pnpm，请下载并按照其安装说明进行操作：

- 使用 [fnm](https://github.com/Schniz/fnm) 或从 [官方网站](https://nodejs.org) 安装 Node.js
- 安装 [pnpm](https://pnpm.io/installation)

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 安装 Foundry

Viem 使用 [Foundry](https://book.getfoundry.sh/) 进行测试。我们在一个分叉的以太坊节点上运行本地 [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) 实例，在这里我们还可以使用 [Forge](https://book.getfoundry.sh/forge/) 等工具将测试合约部署到其中。

使用以下命令安装 Foundry：

```bash
curl -L https://foundry.paradigm.xyz | bash
```

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 安装依赖

进入项目的根目录后，运行以下命令以安装项目的依赖：

```bash
pnpm install
```

安装完成后，pnpm 会在项目中链接包以进行开发，并设置 [git hooks](https://github.com/toplenboren/simple-git-hooks)。

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 运行测试套件

首先，将以下内容添加到你的环境中（建议使用 [`direnv`](https://github.com/direnv/direnv)）：

```bash
VITE_ANVIL_FORK_URL=
VITE_ANVIL_FORK_URL_OPTIMISM=
VITE_ANVIL_FORK_URL_OPTIMISM_SEPOLIA=
VITE_ANVIL_FORK_URL_SEPOLIA=
VITE_ANVIL_FORK_URL_ZKSYNC=
VITE_BATCH_MULTICALL=false
VITE_NETWORK_TRANSPORT_MODE=http
```

`VITE_ANVIL_FORK_URL` 可以是任何 RPC 服务提供商（例如 Alchemy 或 Infura）的主网。现在你准备好运行测试了！

- `pnpm test` — 以观察模式运行测试

有时可能会有一些测试意外失败 – 你可以按 `f` 重新运行它们，它们应该会通过。

在添加新功能或修复错误时，重要的是添加测试用例以覆盖新/更新的行为。

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 编写文档

文档对于帮助各个经验水平的开发者使用 Viem 至关重要。Viem 使用 [Vocs](https://vocs.dev) 和 Markdown 来构建文档网站（位于 [`site`](../site)）。要在开发模式下启动网站，请运行：

```bash
pnpm docs:dev 
```

尽量保持文档简洁，并使用简单的语言，以便各个经验水平的人都能理解。如果你认为某些内容不清晰或可以更好地解释，欢迎你提交拉取请求。

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 提交拉取请求

当你准备好提交拉取请求时，可以遵循以下命名约定：

- 拉取请求标题使用 [祈使语气](https://en.wikipedia.org/wiki/Imperative_mood)（例如，`添加某个功能`，`修复某个问题`）。
- [变更集](#versioning) 使用过去时动词（例如，`添加了某个功能`，`修复了某个问题`）。

当你提交拉取请求时，GitHub 会自动对你的更改进行 lint、构建和测试。如果你看到一个 ❌，很可能是你代码中的错误。请通过 GitHub 界面检查日志以找到原因。

<div align="right">
  <a href="#basic-guide">&uarr; 返回顶部</a></b>
</div>

---

### 版本控制

在添加新功能或修复错误时，我们需要提升包的版本。我们使用 [Changesets](https://github.com/changesets/changesets) 来做到这一点。

> **注意**
>
> 只有影响公共 API 或现有行为（例如错误）的代码库更改需要变更集。

每个变更集定义了应该发布哪些包，以及更改是否应该是主要/次要/补丁版本发布，并提供将在发布时添加到变更日志的发布说明。

要创建新的变更集，请运行 `pnpm changeset`。这将运行 Changesets CLI，提示你提供有关更改的详细信息。创建后，你将能够编辑该文件 — 不用担心一开始就做到完美。

尽管你可以在技术上使用任何你喜欢的 markdown 格式，但应避免使用标题，因为每个变更集最终将嵌套在一个项目列表中。相反，应该使用粗体文本作为部分标题。

如果你的 PR 正在对已经有变更集的区域进行更改（例如，已经有一个变更集涵盖主题 API 更改，但你正在对同一 API 进行进一步更改），你应该在 PR 中更新现有的变更集，而不是创建一个新的。

---

<br>

<div>
  ✅ 现在你准备好为 Viem 贡献了！
</div>

<div align="right">
  <a href="#advanced-guide">&uarr; 返回顶部</a></b>
</div>

---

## 链

如果你希望贡献以向 `viem/chains` 入口添加额外的链，请在提交拉取请求之前注意以下几个要求。

### 要求

- **必须具备**：
  - 链必须合并到 [ethereum-lists/chains](https://github.com/ethereum-lists/chains) 中，
  - 一个唯一的链 ID (`id`)，
  - 一个可读的名称 (`name`)，
  - 一个本地货币参考 (`nativeCurrency`)，
  - 一个公共的、可信的 RPC URL (`rpcUrls.default`)
- **可选的**：
  - 一个区块浏览器 (`blockExplorers`)
  - 一个 [multicall3](https://www.multicall3.com/) 合约 (`contracts.multicall3`)
    - 此合约 **必须** 被验证，并且 **必须** 与 [multicall3 合约](https://etherscan.io/address/0xca11bde05977b3631167028862be2a173976ca11#code) 的字节码匹配。
- **可选**：
  - ENS 注册合约 (`contracts.ensRegistry`)
  - 测试网标志 (`testnet`)

如果你的链满足必要的标准，你可以提交拉取请求以供考虑。如果你的拉取请求不满足标准，它将被关闭。

### 属性参考

[`Chain` 类型](../src/types/chain.ts) 有许多重要属性，你可能会对这些属性的添加感到困惑。大多数属性存在于 [`ethereum-lists/chains` 仓库](https://github.com/ethereum-lists/chains/tree/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains) 中。

- `id`：网络的链 ID。可以通过在 [ChainList](https://chainlist.org/) 中输入网络名称找到。示例：“Ethereum Mainnet”的链 ID 为 `1`。
- `name`：网络的可读名称。示例：“币安智能链主网”
- `nativeCurrency`：网络的本地货币。来自 [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L20-L24)。
- `rpcUrls`：链的 RPC URL 集合。来自 [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L4-L18)。
- `blockExplorers`：链的区块浏览器集合。来自 [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L30-L36)。
- `contracts`：链的已部署合约集合。
  - `multicall3` 是可选的，但其地址很可能是 `0xca11bde05977b3631167028862be2a173976ca11` – 你可以在区块浏览器上找到已部署的区块号。来自 [`mds1/multicall`](https://github.com/mds1/multicall#multicall3-contract-addresses)。
  - `ensRegistry` 是可选的 – 不是所有链都有 ENS 注册表。有关更多信息，请参见 [ENS 部署](https://docs.ens.domains/ens-deployments)。
  - `ensUniversalResolver` 是可选的 – 不是所有链都有 ENS 通用解析器。
- `testnet`：链是否为测试网。

### 添加链

#### 1. 阅读贡献指南

阅读 [基本指南](#basic-guide) 以设置你的环境。

#### 2. 创建链文件

在 [`src/chains/definitions/`](../src/chains/definitions/) 中为你的链创建一个文件。

示例：

```diff

 src/
 ├─ chains/
 │  ├─ definitions/
 │  │  ├─ avalanche.ts
 │  │  ├─ ...
+│  │  ├─ example.ts
 │  │  ├─ ...
 │  │  ├─ zora.ts
 │  ├─ index.ts
```

#### 3. 定义你的链

在 `defineChain` 中定义你的链数据。

示例：

```ts
// src/chains/definitions/example.ts
import { defineChain } from '../../utils/chain/defineChain.js'

export const mainnet = /*#__PURE__*/ defineChain({
  id: 1,
  name: 'Example Chain',
  nativeCurrency: { name: 'Example', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://example.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 69420,
    },
  },
})
```

#### 4. 导出你的链

在 [`src/chains/index.ts`](../src/chains/index.ts) 中导出链。

示例：

```diff
export type { Chain } from '../types/chain.js'

export { arbitrum } from './definitions/arbitrum.js'
...
+export { example } from './definitions/example.js'
...
export { zora } from './definitions/zora.js'
```

#### 5. 添加变更集

添加一个 `patch` 变更集，描述为 `"Added <your chain here> chain."`。

```diff
> pnpm changeset

What kind of change is this for Viem?
+ patch

Please enter a summary for this change
+ Added Example chain.
```

#### 6. 打开你的 PR

现在你可以打开你的拉取请求了。

---

<div align="right">
  <a href="#advanced-guide">&uarr; 返回顶部</a></b>
</div>