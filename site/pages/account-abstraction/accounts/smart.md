# 智能账户

**智能账户**是一个其实现位于**智能合约**中的账户，并实现了 [ERC-4337 接口](https://eips.ethereum.org/EIPS/eip-4337#account-contract-interface) 。

**智能账户**可以由一个或多个**所有者**控制，这些所有者可以是[本地账户](/docs/accounts/local)或[JSON-RPC 账户](/docs/accounts/jsonRpc)（如果支持）。**所有者账户**负责代表**智能账户**签署用户操作（交易），然后通过[打包器](https://eips.ethereum.org/EIPS/eip-4337#bundling)将其广播到网络。

:::note
**兼容性说明**

由于 ERC-4337 并未在协议中确立，这意味着智能账户与 Viem 的交易 API（如`sendTransaction`和`writeContract`）不兼容。

发送“交易”可以通过将**用户操作**广播到**打包器**来实现，打包器随后会在短时间内将其广播到网络。

**用户操作**的最常见操作是：

- [`sendUserOperation`](/account-abstraction/actions/bundler/sendUserOperation)（也支持[合约写入](/account-abstraction/actions/bundler/sendUserOperation#contract-calls) ）
- [`estimateUserOperationGas`](/account-abstraction/actions/bundler/estimateUserOperationGas)
- [`getUserOperation`](/account-abstraction/actions/bundler/getUserOperation)
- [`getUserOperationReceipt`](/account-abstraction/actions/bundler/getUserOperationReceipt)

一旦账户抽象在协议中确立，我们预计上述操作将因 Viem 的交易 API 而变得多余。
:::