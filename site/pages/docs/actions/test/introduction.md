# 测试操作简介 [关于 viem 中测试操作的简要介绍]

测试操作是与“测试”以太坊 RPC 方法（`evm_mine`、`anvil_setBalance`、`anvil_impersonate` 等）一一对应的操作。它们与 [测试客户端](/docs/clients/test) 一起使用。

测试操作用于测试和模拟目的。测试操作的示例包括 [挖掘一个区块](/docs/actions/test/mine)、[设置账户余额](/docs/actions/test/setBalance) 和 [模拟账户](/docs/actions/test/impersonateAccount)。

测试操作是 viem 的一个重要组成部分，因为它们提供了一种在以太坊网络上测试和模拟不同场景的方法。它们通常被开发者用于构建 dapp 和其他需要在部署到网络之前进行测试的应用程序。通过使用测试操作，开发者可以在受控环境中测试其应用程序的行为，而无需真实余额或真实用户。这使得识别和修复错误变得更加容易，并确保应用程序在部署到网络时能够按预期工作。