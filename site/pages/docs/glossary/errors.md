# 错误 [viem 中的错误词汇表]

viem 中的所有错误都扩展自 [`BaseError`](https://github.com/wevm/viem/blob/main/src/errors/base.ts)。

## ABI

### `AbiConstructorNotFoundError`
### `AbiConstructorParamsNotFoundError`
### `AbiDecodingDataSizeInvalidError`
### `AbiDecodingDataSizeTooSmallError`
### `AbiDecodingZeroDataError`
### `AbiEncodingArrayLengthMismatchError`
### `AbiEncodingBytesSizeMismatchError`
### `AbiEncodingLengthMismatchError`
### `AbiErrorInputsNotFoundError`
### `AbiErrorNotFoundError`
### `AbiErrorSignatureNotFoundError`
### `AbiEventNotFoundError`
### `AbiEventSignatureEmptyTopicsError`
### `AbiEventSignatureNotFoundError`
### `AbiFunctionNotFoundError`
### `AbiFunctionOutputsNotFoundError`
### `AbiFunctionSignatureNotFoundError`
### `BytesSizeMismatchError`
### `DecodeLogTopicsMismatch`
### `InvalidAbiDecodingTypeError`
### `InvalidAbiEncodingTypeError`
### `InvalidArrayError`
### `InvalidDefinitionTypeError`
### `UnsupportedPackedAbiType`

## 账户

### `AccountNotFoundError`

当没有提供账户给需要账户的操作时。

## 地址

### `InvalidAddressError`

当地址无效时。

## 区块

### `BlockNotFoundError`

## 链

### `ChainDoesNotSupportContract`
### `ChainMismatchError`
### `ChainNotFoundError`
### `ClientChainNotConfiguredError`
### `InvalidChainIdError`

## 合约

### `CallExecutionError`
### `ContractFunctionExecutionError`
### `ContractFunctionRevertedError`
### `ContractFunctionZeroDataError`
### `RawContractError`

## 数据

### `SizeExceedsPaddingSizeError`

## 编码

### `DataLengthTooLongError`
### `DataLengthTooShortError`
### `IntegerOutOfRangeError`
### `InvalidBytesBooleanError`
### `InvalidHexBooleanError`
### `InvalidHexValueError`
### `OffsetOutOfBoundsError`
### `SizeOverflowError`

## ENS

### `EnsAvatarInvalidMetadataError`
### `EnsAvatarInvalidNftUriError`
### `EnsAvatarUnsupportedNamespaceError`
### `EnsAvatarUriResolutionError`

## 估算 Gas

### `EstimateGasExecutionError`

## 日志

### `FilterTypeNotSupportedError`

## 节点

### `ExecutionRevertedError`
### `FeeCapTooHighError`
### `FeeCapTooLowError`
### `InsufficientFundsError`
### `IntrinsicGasTooHighError`
### `IntrinsicGasTooLowError`
### `NonceMaxValueError`
### `NonceTooHighError`
### `NonceTooLowError`
### `TipAboveFeeCapError`
### `TransactionTypeNotSupportedError`
### `UnknownNodeError`

## 请求

### `HttpRequestError`
### `RpcRequestError`
### `TimeoutError`
### `WebSocketRequestError`

## RPC

### `ChainDisconnectedError`
### `InternalRpcError`
### `InvalidInputRpcError`
### `InvalidParamsRpcError`
### `InvalidRequestRpcError`
### `JsonRpcVersionUnsupportedError`
### `LimitExceededRpcError`
### `MethodNotFoundRpcError`
### `MethodNotSupportedRpcError`
### `ParseRpcError`
### `ProviderDisconnectedError`
### `ProviderRpcError`
### `ResourceNotFoundRpcError`
### `ResourceUnavailableRpcError`
### `RpcError`
### `SwitchChainError`
### `TransactionRejectedRpcError`
### `UnauthorizedProviderError`
### `UnknownRpcError`
### `UnsupportedProviderMethodError`
### `UserRejectedRequestError`

## SIWE

### CreateSiweMessageErrorType
### SiweInvalidMessageFieldErrorType
### VerifySiweMessageErrorType

## 交易

### `FeeConflictError`
### `InvalidLegacyVError`
### `InvalidSerializableTransactionError`
### `InvalidSerializedTransactionError`
### `InvalidSerializedTransactionTypeError`
### `InvalidStorageKeySizeError`
### `TransactionExecutionError`
### `TransactionNotFoundError`
### `TransactionReceiptNotFoundError`
### `WaitForTransactionReceiptTimeoutError`

## 传输

### `UrlRequiredError`