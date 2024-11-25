# 术语 [viem 中的术语表]

## 区块

区块是一个捆绑的信息单元，包括一个有序的交易列表和共识相关的信息。区块由权益证明验证者提议，此时它们在整个点对点网络中共享，所有其他节点都可以轻松独立验证。共识规则决定了区块的内容被视为有效的标准，任何无效的区块都会被网络忽略。这些区块及其内部交易的排序创建了一个确定性的事件链，最终表示网络的当前状态。

## 链

链指的是一个特定的区块链网络或协议，它维护一个去中心化、分布式的交易和其他数据的账本。每个链都有自己的规则、共识机制和本地加密货币（如果有的话）。

链的示例包括：以太坊主网、Polygon、Optimism、Avalanche、币安智能链等。

## EIP-1559 交易

EIP-1559 是一个以太坊改进提案，于 2021 年 8 月作为伦敦硬分叉的一部分实施。它为以太坊交易引入了一种新的交易格式，称为 EIP-1559 交易（又称“交易类型 2”）。

当用户创建 EIP-1559 交易时，他们指定了愿意支付的最高费用（`maxFeePerGas`）以及小费（`maxPriorityFeePerGas`）以激励矿工。用户实际支付的费用由网络根据当前的区块空间需求和交易的优先级来确定。

## 事件日志

事件日志是智能合约发出的事件的记录。事件是智能合约中的一种函数，可以通过特定的操作或条件触发，并可用于通知去中心化应用程序网络上的变化。

[查看更多](https://ethereum.org/en/developers/docs/smart-contracts/anatomy/#events-and-logs)

## 过滤器

在以太坊中，过滤器是一种用于查询以太坊区块链中特定事件或信息的机制。

以太坊中有三种类型的过滤器：

1. 区块过滤器 - 这些过滤器允许用户监控区块链中新添加的区块。

2. 待处理交易过滤器 - 这些过滤器允许用户监控区块链中待处理的交易。

3. 事件过滤器 - 这些过滤器允许用户监控区块链中智能合约发出的特定事件，例如代币转移。

创建过滤器时，它会返回一个过滤器 ID，用户可以在稍后时间使用该 ID 检索过滤器的结果。用户可以定期轮询过滤器以获取与过滤器标准匹配的新事件或变化。

## 可读性 ABI

可读性 ABI 将 JSON ABI 压缩为更易读且更简洁的签名。有关更多信息，请查看 [ABIType](https://abitype.dev/api/human) 文档。

## 传统交易

以太坊中的传统交易是指使用以太坊交易格式的旧版本创建的交易，称为“交易类型 0”。在引入 EIP-1559 升级之前，该交易格式被使用，该升级于 2021 年 8 月实施。

## 不符合规范的日志

不符合规范的日志是指其 `topics` 和 `data` 与 `event` 上的 **indexed** 和 **non-indexed** 参数不匹配的日志。`topics` 对应于 **indexed** 参数，而 `data` 对应于 **non-indexed** 参数。

例如，以下是一个具有 3 个索引参数和 1 个非索引参数的事件定义：

```solidity
event Transfer(
  bool indexed foo, 
  uint256 baz, 
  string indexed bar, 
  boolean indexed barry
)
```

上述签名的符合规范的日志将是：

```ts
const log = {
  ...
  data: '0x
    00...23c346 // ✅ 非索引参数 (baz)
  ',
  topics: [
    '0xdd...23b3ef', // 事件签名
    '0x00...000001', // ✅ 索引参数 (foo)
    '0xae...e1cc58', // ✅ 索引参数 (bar)
    '0x00...000000', // ✅ 索引参数 (barry)
  ],
  ...
}
```

上述签名的不符合规范的日志将是：

```ts
const log = {
  ...
  data: '0x
    00...23c346 // ✅ 非索引参数 (baz)
    00...ae0000 // ❌ 索引参数 (bar)
    00...000001 // ❌ 索引参数 (barry)
  ',
  topics: [
    '0xdd...23b3ef', // 事件签名
    '0x00...b92266', // ✅ 索引参数 (foo)
  ],
  ...
}
```

不符合规范的日志可能会出现，当另一个合约可能使用相同的事件签名，但具有不同数量的索引和非索引参数。例如，上述日志的定义将是：

```solidity
event Transfer(
  bool indexed foo, 
  uint256 baz, 
  string bar, 
  boolean barry
)
```

## 交易

交易是由账户发送的请求在以太坊区块链上执行某个操作的消息。交易可用于在账户之间转移以太币、执行智能合约代码、部署智能合约等。

## 交易收据

交易收据是以太坊区块链上特定交易结果的记录。当交易提交到以太坊网络时，它会被矿工处理并包含在一个区块中。一旦区块被添加到区块链，交易收据就会生成并存储在区块链上。

交易收据包含有关交易的信息，包括：

- 交易哈希：交易的唯一标识符。
- 区块号和区块哈希：交易被包含的区块。
- 使用的 gas：交易消耗的 gas 量。
- 交易状态：“成功”表示交易已执行，否则“回滚”表示交易已回滚。
- 交易生成的日志：在交易执行期间智能合约生成的任何日志事件。

## 传输

传输是负责在 viem 中执行外发请求（即 RPC 请求）的中介层。