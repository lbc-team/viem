# 钱包操作简介 [对 viem 中钱包操作的简要介绍]

钱包操作是与“钱包”或“可签名”以太坊 RPC 方法（`eth_requestAccounts`、`eth_sendTransaction` 等）一一对应的操作。它们与 [钱包客户端](/docs/clients/wallet) 一起使用。

钱包操作需要特殊权限并提供签名功能。钱包操作的示例包括 [检索用户的账户地址](/docs/actions/wallet/getAddresses)、[发送交易](/docs/actions/wallet/sendTransaction) 和 [签名消息](/docs/actions/wallet/signMessage)。

钱包操作提供了一种安全灵活的方式来访问用户的账户并在以太坊网络上执行操作。它们通常被 dapp 和其他需要执行交易、与智能合约交互或签名消息的应用程序使用。