# 公共操作简介 [关于 viem 中公共操作的简要介绍]

公共操作是与“公共”以太坊 RPC 方法（`eth_blockNumber`、`eth_getBalance` 等）一一对应的操作。它们与 [公共客户端](/docs/clients/public) 一起使用。

公共操作不需要任何特殊权限，也不向用户提供签名能力。公共操作的示例包括 [获取账户余额](/docs/actions/public/getBalance)、[检索特定交易的详细信息](/docs/actions/public/getTransactionReceipt) 和 [获取网络当前区块号](/docs/actions/public/getBlockNumber)。

公共操作提供了一种简单且安全的方式来访问以太坊区块链上的公共数据。它们被广泛用于需要检索有关交易、账户、区块和网络上其他数据的信息的 dapp 和其他应用程序。