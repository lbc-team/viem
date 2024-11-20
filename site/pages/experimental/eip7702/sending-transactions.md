# 使用 EIP-7702 发送交易

下面的指南演示了如何发送 EIP-7702 交易以调用外部拥有账户上的合约函数。

## 概述

以下是如何广播 EIP-7702 交易以在 EOA 指定的合约上发出简单事件的端到端概述。我们将其分解为下面的 [步骤](#steps)。

:::code-group

```ts twoslash [example.ts]
import { parseEther } from 'viem'
import { walletClient } from './config'
import { abi, contractAddress } from './contract'

// 1. 授权将合约的字节码注入到我们的账户中。
const authorization = await walletClient.signAuthorization({
  contractAddress,
})

// 2. 调用合约的 `execute` 函数以执行批量调用。
const hash = await walletClient.sendTransaction({
  authorizationList: [authorization],
  data: encodeFunctionData({
    abi,
    functionName: 'execute',
    args: [
      [
        {
          data: '0x',
          to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
          value: parseEther('0.001'),
        },
        {
          data: '0x',
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
          value: parseEther('0.002'), 
        },  
      ],
    ]
  }),
  to: walletClient.account.address,
})
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

```ts twoslash [config.ts] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const walletClient = createWalletClient({
  account,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())
```

```solidity [BatchCallDelegation.sol]
pragma solidity ^0.8.20;

contract BatchCallDelegation {
  struct Call {
    bytes data;
    address to;
    uint256 value;
  }

  function execute(Call[] calldata calls) external payable {
    for (uint256 i = 0; i < calls.length; i++) {
      Call memory call = calls[i];
      (bool success, ) = call.to.call{value: call.value}(call.data);
      require(success, "call reverted");
    }
  }
}
```

:::

:::warning
EIP-7702 目前不支持以太坊 anvil 或测试网。对于这个示例，我们使用 `anvil` 链，它与 [Anvil 节点](https://book.getfoundry.sh/anvil/)（一个本地以太坊网络）接口。
:::

## 步骤

### 0. 安装并运行 Anvil

EIP-7702 目前不支持以太坊主网或测试网，因此让我们设置一个兼容 EIP-7702 的网络。我们将使用 [Anvil 节点](https://book.getfoundry.sh/anvil/) 作为示例。如果你使用的是现有的 EIP-7702 兼容网络，可以跳过此步骤。

```bash
curl -L https://foundry.paradigm.xyz | bash
anvil --hardfork prague
```

### 1. 设置智能合约

我们需要设置一个智能合约进行交互。为了本指南的目的，我们将 [创建](https://book.getfoundry.sh/reference/forge/forge-init) 和 [部署](https://book.getfoundry.sh/forge/deploying) 一个 `BatchCallDelegation.sol` 合约，但你可以使用任何现有的已部署合约。

首先， [将合约部署](https://book.getfoundry.sh/forge/deploying) 到网络，使用以下源代码：

```solidity [BatchCallDelegation.sol]
pragma solidity ^0.8.20;

contract BatchCallDelegation {
  struct Call {
    bytes data;
    address to;
    uint256 value;
  }

  function execute(Call[] calldata calls) external payable {
    for (uint256 i = 0; i < calls.length; i++) {
      Call memory call = calls[i];
      (bool success, ) = call.to.call{value: call.value}(call.data);
      require(success, "call reverted");
    }
  }
}
```

:::warning

**请勿在生产环境中使用**

此合约仅用于演示 EIP-7702 的工作原理。如果 [代理正在代表账户执行调用](#5-optional-use-a-delegate)，则未实现防止重放攻击的 nonce 和签名验证机制。

:::

### 2. 设置客户端和账户

接下来，我们需要设置一个客户端和外部拥有账户以签署 EIP-7702 授权。

此代码片段使用 [扩展客户端](/experimental/eip7702/client) 指南。

```ts twoslash [config.ts]
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const walletClient = createWalletClient({
  account,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())
```

### 3. 授权合约指定

我们需要签署一个授权以将合约指定给账户。

在下面的示例中，我们使用附加到 `walletClient` 的 `account` 来签署授权——这将是合约字节码将被注入的账户。

:::code-group

```ts twoslash [example.ts]
import { walletClient } from './config'
import { contractAddress } from './contract'
 
const authorization = await walletClient.signAuthorization({ // [!code focus]
  contractAddress, // [!code focus]
}) // [!code focus]
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

```ts twoslash [config.ts]
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const walletClient = createWalletClient({
  account,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())
```

:::

### 4. 调用合约函数

我们现在可以通过向账户（`account`）发送带有授权（`authorizationList`）的交易来执行批量调用。

:::code-group

```ts twoslash [example.ts]
import { encodeFunctionData, parseEther } from 'viem'
import { walletClient } from './config'
import { contractAddress } from './contract'
 
const authorization = await walletClient.signAuthorization({
  contractAddress,
})

const hash = await walletClient.sendTransaction({ // [!code focus]
  authorizationList: [authorization], // [!code focus]
  data: encodeFunctionData({ // [!code focus]
    abi, // [!code focus]
    functionName: 'execute', // [!code focus]
    args: [ // [!code focus]
      [ // [!code focus]
        { // [!code focus]
          data: '0x', // [!code focus]
          to: '0xcb98643b8786950F0461f3B0edf99D88F274574D', // [!code focus]
          value: parseEther('0.001'), // [!code focus]
        }, // [!code focus]
        { // [!code focus]
          data: '0x', // [!code focus]
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
          value: parseEther('0.002'), // [!code focus]
        }, // [!code focus]
      ], // [!code focus]
    ] // [!code focus]
  }), // [!code focus]
  to: walletClient.account.address, // [!code focus]
}) // [!code focus]
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

```ts twoslash [config.ts]
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const walletClient = createWalletClient({
  account,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())
```

:::

### 5. 可选：使用代理

我们还可以利用代理账户代表授权账户执行调用。这在我们想要为用户“赞助”交易（即支付他们的 gas 费用）时非常有用。

:::code-group

```ts twoslash [example.ts]
import { encodeFunctionData, parseEther } from 'viem'
import { walletClient } from './config'
import { contractAddress } from './contract'

const delegate = privateKeyToAccount('0x...') // [!code ++]

const authorization = await walletClient.signAuthorization({
  contractAddress,
  delegate, // [!code ++]
})

const hash = await walletClient.sendTransaction({
  account: delegate, // [!code ++]
  authorizationList: [authorization],
  data: encodeFunctionData({
    abi,
    functionName: 'execute',
    args: [
      [
        {
          data: '0x',
          to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
          value: parseEther('0.001'),
        },
        {
         data: '0x',
          to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
          value: parseEther('0.002'),
        },
      ],
    ]
  }),
  to: walletClient.account.address,
})
```

```ts twoslash [config.ts]
// @noErrors
import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const walletClient = createWalletClient({
  account,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

:::