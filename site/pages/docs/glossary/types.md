# 类型 [viem 中的类型词汇表]

## `Abi`

与 [合约 ABI 规范](https://docs.soliditylang.org/en/latest/abi-spec.html#json) 匹配的类型

从 [ABIType](https://abitype.dev/api/types#abi) 重新导出。

## `AbiError`

ABI [错误](https://docs.soliditylang.org/en/latest/abi-spec#errors) 类型。

从 [ABIType](https://abitype.dev/api/types#abierror) 重新导出。

## `AbiEvent`

ABI [事件](https://docs.soliditylang.org/en/latest/abi-spec#events) 类型。

从 [ABIType](https://abitype.dev/api/types#abievent) 重新导出。

## `AbiFunction`

ABI [函数](https://docs.soliditylang.org/en/latest/abi-spec#argument-encoding) 类型。

从 [ABIType](https://abitype.dev/api/types#abifunction) 重新导出。

## `AbiParameter`

ABI 函数、事件和错误的 `inputs` 和 `outputs` 项。

从 [ABIType](https://abitype.dev/api/types#abiparameter) 重新导出。

## `AbiParameterToPrimitiveTypes`

将 `AbiParameter` 转换为相应的 TypeScript 原始类型。

[查看更多](https://abitype.dev/api/utilities#abiparametertoprimitivetype)

## `AbiParametersToPrimitiveTypes`

将 `AbiParameter` 数组转换为相应的 TypeScript 原始类型。

[查看更多](https://abitype.dev/api/utilities#abiparameterstoprimitivetypes)

## `AccessList`

访问列表。

## `Address`

地址。

从 [ABIType](https://abitype.dev/api/types#address) 重新导出。

## `Block`

[区块](/docs/glossary/terms#block) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/block.ts)

## `Chain`

[链](/docs/glossary/terms#chain) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/chain.ts)

## `CompactSignature`

[EIP-2098](https://eips.ethereum.org/EIPS/eip-2098) 紧凑签名的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/misc.ts)

## `FeeHistory`

费用历史的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/fee.ts)

## `FeeValues`

费用值的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/fee.ts)

## `Filter`

[过滤器](/docs/glossary/terms#filter) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/filter.ts)

## `Hash`

哈希值的类型 – 以 "0x" 开头的字符串：`"0x${string}"`

## `Hex`

十六进制值的类型 – 以 "0x" 开头的字符串：`"0x${string}"`

## `Log`

[事件日志](/docs/glossary/terms#event-log) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/log.ts)

## `Signature`

结构化签名的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/misc.ts)

## `Transaction`

[交易](/docs/glossary/terms#transaction) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/transaction.ts)

## `TransactionReceipt`

[交易回执](/docs/glossary/terms#transaction-receipt) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/transaction.ts)

## `Transport`

[传输](/docs/glossary/terms#transports) 的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/clients/transports/createTransport.ts)

## `WalletPermission`

钱包（JSON-RPC 账户）权限的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/eip1193.ts)

## `TransactionSerializedEIP1559`

EIP-1559 交易十六进制值 – 以 "0x02" 开头的字符串：`"0x02${string}"`

## `TransactionSerializedEIP2930`

EIP-2930 交易十六进制值 – 以 "0x01" 开头的字符串：`"0x01${string}"`

## `TransactionSerializedLegacy`

传统交易十六进制值 – 以 "0x" 开头的字符串：`"0x${string}"`

## `TransactionType`

所有类型的交易。`"eip1559" | "eip2930" | "eip4844" | "eip7702" | "legacy"`

## `TransactionRequest`

所有交易请求的类型。

[查看类型](https://github.com/wevm/viem/blob/main/src/types/transaction.ts)。

## `StateOverride`

定义 `eth_call` 方法的状态覆盖的类型。 [查看更多](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-eth#eth-call)