# 客户端与传输简介 [客户端与传输的简要介绍]

## 客户端

一个 **客户端** 提供对一组 **操作** 的访问。

> 在 viem 的上下文中，**客户端** 类似于 [Ethers.js 提供者](https://docs.ethers.org/v5/api/providers/)。

在 viem 中有三种类型的 **客户端**：

- 一个 [公共客户端](/docs/clients/public)，提供对 [公共操作](/docs/actions/public/introduction) 的访问，例如 `getBlockNumber` 和 `getBalance`。
- 一个 [钱包客户端](/docs/clients/wallet)，提供对 [钱包操作](/docs/actions/wallet/introduction) 的访问，例如 `sendTransaction` 和 `signMessage`。
- 一个 [测试客户端](/docs/clients/test)，提供对 [测试操作](/docs/actions/test/introduction) 的访问，例如 `mine` 和 `impersonate`。

## 传输

一个 **客户端** 是通过 **传输** 实例化的，传输是负责执行外发请求（即 RPC 请求）的中介层。

在 viem 中有三种类型的传输：

- 一个 [HTTP 传输](/docs/clients/transports/http)，通过 HTTP JSON-RPC API 执行请求。
- 一个 [WebSocket 传输](/docs/clients/transports/websocket)，通过 WebSocket JSON-RPC API 执行请求。
- 一个 [自定义传输](/docs/clients/transports/custom)，通过 [EIP-1193 `request` 函数](https://eips.ethereum.org/EIPS/eip-1193) 执行请求。