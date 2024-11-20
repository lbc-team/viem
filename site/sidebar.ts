import type { Sidebar } from 'vocs'

export const sidebar = {
  '/docs/': [
    {
      text: '介绍',
      items: [
        { text: '为什么选择 Viem', link: '/docs/introduction' },
        { text: '安装', link: '/docs/installation' },
        { text: '入门', link: '/docs/getting-started' },
        { text: '平台兼容性', link: '/docs/compatibility' },
        { text: '常见问题', link: '/docs/faq' },
      ],
    },
    {
      text: '指南',
      items: [
        { text: '迁移指南', link: '/docs/migration-guide' },
        { text: 'Ethers v5 → viem', link: '/docs/ethers-migration' },
        { text: 'TypeScript', link: '/docs/typescript' },
        { text: '错误处理', link: '/docs/error-handling' },
        { text: 'Blob 交易', link: '/docs/guides/blob-transactions' },
      ],
    },
    {
      text: '客户端与传输',
      items: [
        { text: '介绍', link: '/docs/clients/intro' },
        { text: '公共客户端', link: '/docs/clients/public' },
        { text: '钱包客户端', link: '/docs/clients/wallet' },
        { text: '测试客户端', link: '/docs/clients/test' },
        { text: '构建自己的客户端', link: '/docs/clients/custom' },
        {
          text: '传输',
          items: [
            {
              text: 'HTTP',
              link: '/docs/clients/transports/http',
            },
            {
              text: 'WebSocket',
              link: '/docs/clients/transports/websocket',
            },
            {
              text: '自定义 (EIP-1193)',
              link: '/docs/clients/transports/custom',
            },
            {
              text: 'IPC',
              link: '/docs/clients/transports/ipc',
            },
            {
              text: '回退',
              link: '/docs/clients/transports/fallback',
            },
          ],
        },
      ],
    },
    {
      text: '公共操作',
      collapsed: true,
      items: [
        { text: '介绍', link: '/docs/actions/public/introduction' },
        {
          text: '账户',
          items: [
            {
              text: 'getBalance',
              link: '/docs/actions/public/getBalance',
            },
            {
              text: 'getTransactionCount',
              link: '/docs/actions/public/getTransactionCount',
            },
          ],
        },
        {
          text: '区块',
          items: [
            { text: 'getBlock', link: '/docs/actions/public/getBlock' },
            {
              text: 'getBlockNumber',
              link: '/docs/actions/public/getBlockNumber',
            },
            {
              text: 'getBlockTransactionCount',
              link: '/docs/actions/public/getBlockTransactionCount',
            },
            {
              text: 'watchBlockNumber',
              link: '/docs/actions/public/watchBlockNumber',
            },
            {
              text: 'watchBlocks',
              link: '/docs/actions/public/watchBlocks',
            },
          ],
        },
        {
          text: '调用',
          items: [{ text: 'call', link: '/docs/actions/public/call' },],
        },
        {
          text: '链',
          items: [
            { text: 'getChainId', link: '/docs/actions/public/getChainId' },
          ],
        },
        {
          text: 'EIP-712',
          items: [
            {
              text: 'getEip712Domain',
              link: '/docs/actions/public/getEip712Domain',
            },
          ],
        },
        {
          text: '费用',
          items: [
            {
              text: 'estimateFeesPerGas',
              link: '/docs/actions/public/estimateFeesPerGas',
            },
            {
              text: 'estimateGas',
              link: '/docs/actions/public/estimateGas',
            },
            {
              text: 'estimateMaxPriorityFeePerGas',
              link: '/docs/actions/public/estimateMaxPriorityFeePerGas',
            },
            {
              text: 'getBlobBaseFee',
              link: '/docs/actions/public/getBlobBaseFee',
            },
            {
              text: 'getFeeHistory',
              link: '/docs/actions/public/getFeeHistory',
            },
            {
              text: 'getGasPrice',
              link: '/docs/actions/public/getGasPrice',
            },
          ],
        },
        {
          text: '过滤器与日志',
          items: [
            {
              text: 'createBlockFilter',
              link: '/docs/actions/public/createBlockFilter',
            },
            {
              text: 'createEventFilter',
              link: '/docs/actions/public/createEventFilter',
            },
            {
              text: 'createPendingTransactionFilter',
              link: '/docs/actions/public/createPendingTransactionFilter',
            },
            {
              text: 'getFilterChanges',
              link: '/docs/actions/public/getFilterChanges',
            },
            {
              text: 'getFilterLogs',
              link: '/docs/actions/public/getFilterLogs',
            },
            {
              text: 'getLogs',
              link: '/docs/actions/public/getLogs',
            },
            {
              text: 'watchEvent',
              link: '/docs/actions/public/watchEvent',
            },
            {
              text: 'uninstallFilter',
              link: '/docs/actions/public/uninstallFilter',
            },
          ],
        },
        {
          text: '证明',
          items: [
            {
              text: 'getProof',
              link: '/docs/actions/public/getProof',
            },
          ],
        },
        {
          text: '签名',
          items: [
            {
              text: 'verifyMessage',
              link: '/docs/actions/public/verifyMessage',
            },
            {
              text: 'verifyTypedData',
              link: '/docs/actions/public/verifyTypedData',
            },
          ],
        },
        {
          text: '交易',
          items: [
            {
              text: 'prepareTransactionRequest',
              link: '/docs/actions/wallet/prepareTransactionRequest',
            },
            {
              text: 'getTransaction',
              link: '/docs/actions/public/getTransaction',
            },
            {
              text: 'getTransactionConfirmations',
              link: '/docs/actions/public/getTransactionConfirmations',
            },
            {
              text: 'getTransactionReceipt',
              link: '/docs/actions/public/getTransactionReceipt',
            },
            {
              text: 'sendRawTransaction',
              link: '/docs/actions/wallet/sendRawTransaction',
            },
            {
              text: 'waitForTransactionReceipt',
              link: '/docs/actions/public/waitForTransactionReceipt',
            },
            {
              text: 'watchPendingTransactions',
              link: '/docs/actions/public/watchPendingTransactions',
            },
          ],
        },
      ],
    },
    {
      text: '钱包操作',
      collapsed: true,
      items: [
        { text: '介绍', link: '/docs/actions/wallet/introduction' },
        {
          text: '账户',
          items: [
            {
              text: 'getAddresses',
              link: '/docs/actions/wallet/getAddresses',
            },
            {
              text: 'requestAddresses',
              link: '/docs/actions/wallet/requestAddresses',
            },
          ],
        },
        {
          text: '资产',
          items: [
            {
              text: 'watchAsset',
              link: '/docs/actions/wallet/watchAsset',
            },
          ],
        },
        {
          text: '链',
          items: [
            {
              text: 'addChain',
              link: '/docs/actions/wallet/addChain',
            },
            {
              text: 'switchChain',
              link: '/docs/actions/wallet/switchChain',
            },
          ],
        },
        {
          text: '数据',
          items: [
            {
              text: 'signMessage',
              link: '/docs/actions/wallet/signMessage',
            },
            {
              text: 'signTypedData',
              link: '/docs/actions/wallet/signTypedData',
            },
          ],
        },
        {
          text: '权限',
          items: [
            {
              text: 'getPermissions',
              link: '/docs/actions/wallet/getPermissions',
            },
            {
              text: 'requestPermissions',
              link: '/docs/actions/wallet/requestPermissions',
            },
          ],
        },
        {
          text: '交易',
          items: [
            {
              text: 'prepareTransactionRequest',
              link: '/docs/actions/wallet/prepareTransactionRequest',
            },
            {
              text: 'sendRawTransaction',
              link: '/docs/actions/wallet/sendRawTransaction',
            },
            {
              text: 'sendTransaction',
              link: '/docs/actions/wallet/sendTransaction',
            },
            {
              text: 'signTransaction',
              link: '/docs/actions/wallet/signTransaction',
            },
          ],
        },
      ],
    },
    {
      text: '测试操作',
      collapsed: true,
      items: [
        { text: '介绍', link: '/docs/actions/test/introduction' },
        {
          text: '账户',
          items: [
            {
              text: 'impersonateAccount',
              link: '/docs/actions/test/impersonateAccount',
            },
            { text: 'setBalance', link: '/docs/actions/test/setBalance' },
            { text: 'setCode', link: '/docs/actions/test/setCode' },
            { text: 'setNonce', link: '/docs/actions/test/setNonce' },
            {
              text: 'setStorageAt',
              link: '/docs/actions/test/setStorageAt',
            },
            {
              text: 'stopImpersonatingAccount',
              link: '/docs/actions/test/stopImpersonatingAccount',
            },
          ],
        },
        {
          text: '区块',
          items: [
            { text: 'getAutomine', link: '/docs/actions/test/getAutomine' },
            {
              text: 'increaseTime',
              link: '/docs/actions/test/increaseTime',
            },
            { text: 'mine', link: '/docs/actions/test/mine' },
            {
              text: 'removeBlockTimestampInterval',
              link: '/docs/actions/test/removeBlockTimestampInterval',
            },
            { text: 'setAutomine', link: '/docs/actions/test/setAutomine' },
            {
              text: 'setIntervalMining',
              link: '/docs/actions/test/setIntervalMining',
            },
            {
              text: 'setBlockTimestampInterval',
              link: '/docs/actions/test/setBlockTimestampInterval',
            },
            {
              text: 'setBlockGasLimit',
              link: '/docs/actions/test/setBlockGasLimit',
            },
            {
              text: 'setNextBlockBaseFeePerGas',
              link: '/docs/actions/test/setNextBlockBaseFeePerGas',
            },
            {
              text: 'setNextBlockTimestamp',
              link: '/docs/actions/test/setNextBlockTimestamp',
            },
          ],
        },
        {
          text: '节点',
          items: [
            { text: 'setCoinbase', link: '/docs/actions/test/setCoinbase' },
            {
              text: 'setMinGasPrice',
              link: '/docs/actions/test/setMinGasPrice',
            },
          ],
        },
        {
          text: '设置',
          items: [
            { text: 'reset', link: '/docs/actions/test/reset' },
            {
              text: 'setLoggingEnabled',
              link: '/docs/actions/test/setLoggingEnabled',
            },
            { text: 'setRpcUrl', link: '/docs/actions/test/setRpcUrl' },
          ],
        },
        {
          text: '状态',
          items: [
            { text: 'dumpState', link: '/docs/actions/test/dumpState' },
            { text: 'loadState', link: '/docs/actions/test/loadState' },
            { text: 'revert', link: '/docs/actions/test/revert' },
            { text: 'snapshot', link: '/docs/actions/test/snapshot' },
          ],
        },
        {
          text: '交易',
          items: [
            {
              text: 'dropTransaction',
              link: '/docs/actions/test/dropTransaction',
            },
            {
              text: 'getTxpoolContent',
              link: '/docs/actions/test/getTxpoolContent',
            },
            {
              text: 'getTxpoolStatus',
              link: '/docs/actions/test/getTxpoolStatus',
            },
            {
              text: 'inspectTxpool',
              link: '/docs/actions/test/inspectTxpool',
            },
            {
              text: 'sendUnsignedTransaction',
              link: '/docs/actions/test/sendUnsignedTransaction',
            },
          ],
        },
      ],
    },
    {
      text: '账户',
      collapsed: true,
      items: [
        { text: 'JSON-RPC 账户', link: '/docs/accounts/jsonRpc' },
        {
          text: '本地账户',
          link: '/docs/accounts/local',
          items: [
            {
              text: '私钥',
              link: '/docs/accounts/local/privateKeyToAccount',
            },
            {
              text: '助记词',
              link: '/docs/accounts/local/mnemonicToAccount',
            },
            {
              text: '分层确定性 (HD)',
              link: '/docs/accounts/local/hdKeyToAccount',
            },
            { text: '自定义', link: '/docs/accounts/local/toAccount' },
            {
              text: '工具',
              items: [
                {
                  text: 'createNonceManager',
                  link: '/docs/accounts/local/createNonceManager',
                },
                {
                  text: 'signMessage',
                  link: '/docs/accounts/local/signMessage',
                },
                {
                  text: 'signTransaction',
                  link: '/docs/accounts/local/signTransaction',
                },
                {
                  text: 'signTypedData',
                  link: '/docs/accounts/local/signTypedData',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      text: '链',
      collapsed: true,
      items: [
        { text: '介绍', link: '/docs/chains/introduction' },
        {
          text: '配置',
          items: [
            {
              text: '费用',
              link: '/docs/chains/fees',
            },
            {
              text: '格式化器',
              link: '/docs/chains/formatters',
            },
            {
              text: '序列化器',
              link: '/docs/chains/serializers',
            },
          ],
        },
        {
          text: '实现',
          items: [
            {
              text: 'Celo',
              link: '/docs/chains/celo',
            },
            {
              text: 'OP Stack',
              link: '/op-stack',
            },
            {
              text: 'ZKsync',
              link: '/zksync',
            },
          ],
        },
      ],
    },
    {
      text: '合约',
      collapsed: true,
      items: [
        {
          text: '合约实例',
          link: '/docs/contract/getContract',
        },
        {
          text: '操作',
          items: [
            {
              text: 'createContractEventFilter',
              link: '/docs/contract/createContractEventFilter',
            },
            {
              text: 'deployContract',
              link: '/docs/contract/deployContract',
            },
            {
              text: 'estimateContractGas',
              link: '/docs/contract/estimateContractGas',
            },
            {
              text: 'getCode',
              link: '/docs/contract/getCode',
            },
            {
              text: 'getContractEvents',
              link: '/docs/contract/getContractEvents',
            },
            {
              text: 'getStorageAt',
              link: '/docs/contract/getStorageAt',
            },
            {
              text: 'multicall',
              link: '/docs/contract/multicall',
            },
            {
              text: 'readContract',
              link: '/docs/contract/readContract',
            },
            {
              text: 'simulateContract',
              link: '/docs/contract/simulateContract',
            },
            {
              text: 'writeContract',
              link: '/docs/contract/writeContract',
            },
            {
              text: 'watchContractEvent',
              link: '/docs/contract/watchContractEvent',
            },
          ],
        },
        {
          text: '工具',
          items: [
            {
              text: 'decodeDeployData',
              link: '/docs/contract/decodeDeployData',
            },
            {
              text: 'decodeErrorResult',
              link: '/docs/contract/decodeErrorResult',
            },
            {
              text: 'decodeEventLog',
              link: '/docs/contract/decodeEventLog',
            },
            {
              text: 'decodeFunctionData',
              link: '/docs/contract/decodeFunctionData',
            },
            {
              text: 'decodeFunctionResult',
              link: '/docs/contract/decodeFunctionResult',
            },
            {
              text: 'encodeDeployData',
              link: '/docs/contract/encodeDeployData',
            },
            {
              text: 'encodeErrorResult',
              link: '/docs/contract/encodeErrorResult',
            },
            {
              text: 'encodeEventTopics',
              link: '/docs/contract/encodeEventTopics',
            },
            {
              text: 'encodeFunctionData',
              link: '/docs/contract/encodeFunctionData',
            },
            {
              text: 'encodeFunctionResult',
              link: '/docs/contract/encodeFunctionResult',
            },
            {
              text: 'parseEventLogs',
              link: '/docs/contract/parseEventLogs',
            },
          ],
        },
      ],
    },
    {
      text: 'ENS',
      collapsed: true,
      items: [
        {
          text: '操作',
          items: [
            {
              text: 'getEnsAddress',
              link: '/docs/ens/actions/getEnsAddress',
            },
            {
              text: 'getEnsAvatar',
              link: '/docs/ens/actions/getEnsAvatar',
            },
            { text: 'getEnsName', link: '/docs/ens/actions/getEnsName' },
            {
              text: 'getEnsResolver',
              link: '/docs/ens/actions/getEnsResolver',
            },
            {
              text: 'getEnsText',
              link: '/docs/ens/actions/getEnsText',
            },
          ],
        },
        {
          text: '工具',
          items: [
            { text: 'labelhash', link: '/docs/ens/utilities/labelhash' },
            { text: 'namehash', link: '/docs/ens/utilities/namehash' },
            { text: 'normalize', link: '/docs/ens/utilities/normalize' },
          ],
        },
      ],
    },
    {
      text: 'SIWE',
      collapsed: true,
      items: [
        {
          text: '操作',
          items: [
            {
              text: 'verifySiweMessage',
              link: '/docs/siwe/actions/verifySiweMessage',
            },
          ],
        },
        {
          text: '工具',
          items: [
            {
              text: 'createSiweMessage',
              link: '/docs/siwe/utilities/createSiweMessage',
            },
            {
              text: 'generateSiweNonce',
              link: '/docs/siwe/utilities/generateSiweNonce',
            },
            {
              text: 'parseSiweMessage',
              link: '/docs/siwe/utilities/parseSiweMessage',
            },
            {
              text: 'validateSiweMessage',
              link: '/docs/siwe/utilities/validateSiweMessage',
            },
          ],
        },
      ],
    },
    {
      text: 'ABI',
      collapsed: true,
      items: [
        {
          text: 'decodeAbiParameters',
          link: '/docs/abi/decodeAbiParameters',
        },
        {
          text: 'encodeAbiParameters',
          link: '/docs/abi/encodeAbiParameters',
        },
        {
          text: 'encodePacked',
          link: '/docs/abi/encodePacked',
        },
        {
          text: 'getAbiItem',
          link: '/docs/abi/getAbiItem',
        },
        {
          text: 'parseAbi',
          link: '/docs/abi/parseAbi',
        },
        {
          text: 'parseAbiItem',
          link: '/docs/abi/parseAbiItem',
        },
        {
          text: 'parseAbiParameter',
          link: '/docs/abi/parseAbiParameter',
        },
        {
          text: 'parseAbiParameters',
          link: '/docs/abi/parseAbiParameters',
        },
      ],
    },
    {
      text: '工具',
      collapsed: true,
      items: [
        {
          text: '地址',
          items: [
            {
              text: 'getAddress',
              link: '/docs/utilities/getAddress',
            },
            {
              text: 'getContractAddress',
              link: '/docs/utilities/getContractAddress',
            },
            {
              text: 'isAddress',
              link: '/docs/utilities/isAddress',
            },
            {
              text: 'isAddressEqual',
              link: '/docs/utilities/isAddressEqual',
            },
          ],
        },
        {
          text: 'Blob',
          items: [
            {
              text: 'blobsToProofs',
              link: '/docs/utilities/blobsToProofs',
            },
            {
              text: 'blobsToCommitments',
              link: '/docs/utilities/blobsToCommitments',
            },
            {
              text: 'commitmentsToVersionedHashes',
              link: '/docs/utilities/commitmentsToVersionedHashes',
            },
            {
              text: 'commitmentToVersionedHash',
              link: '/docs/utilities/commitmentToVersionedHash',
            },
            {
              text: 'fromBlobs',
              link: '/docs/utilities/fromBlobs',
            },
            {
              text: 'sidecarsToVersionedHashes',
              link: '/docs/utilities/sidecarsToVersionedHashes',
            },
            {
              text: 'toBlobs',
              link: '/docs/utilities/toBlobs',
            },
            {
              text: 'toBlobSidecars',
              link: '/docs/utilities/toBlobSidecars',
            },
          ],
        },
        {
          text: '链',
          items: [
            {
              text: 'extractChain',
              link: '/docs/utilities/extractChain',
            },
          ],
        },
        {
          text: '数据',
          items: [
            {
              text: 'concat',
              link: '/docs/utilities/concat',
            },
            {
              text: 'isBytes',
              link: '/docs/utilities/isBytes',
            },
            {
              text: 'isHex',
              link: '/docs/utilities/isHex',
            },
            {
              text: 'pad',
              link: '/docs/utilities/pad',
            },
            {
              text: 'slice',
              link: '/docs/utilities/slice',
            },
            {
              text: 'size',
              link: '/docs/utilities/size',
            },
            {
              text: 'trim',
              link: '/docs/utilities/trim',
            },
          ],
        },
        {
          text: '编码',
          items: [
            {
              text: 'fromBytes',
              link: '/docs/utilities/fromBytes',
            },
            {
              text: 'fromHex',
              link: '/docs/utilities/fromHex',
            },
            {
              text: 'fromRlp',
              link: '/docs/utilities/fromRlp',
            },
            {
              text: 'toBytes',
              link: '/docs/utilities/toBytes',
            },
            {
              text: 'toHex',
              link: '/docs/utilities/toHex',
            },
            {
              text: 'toRlp',
              link: '/docs/utilities/toRlp',
            },
          ],
        },
        {
          text: '哈希',
          items: [
            {
              text: 'keccak256',
              link: '/docs/utilities/keccak256',
            },
            {
              text: 'ripemd160',
              link: '/docs/utilities/ripemd160',
            },
            {
              text: 'sha256',
              link: '/docs/utilities/sha256',
            },
            {
              text: 'toEventHash',
              link: '/docs/utilities/toEventHash',
            },
            {
              text: 'toEventSelector',
              link: '/docs/utilities/toEventSelector',
            },
            {
              text: 'toEventSignature',
              link: '/docs/utilities/toEventSignature',
            },
            {
              text: 'toFunctionHash',
              link: '/docs/utilities/toFunctionHash',
            },
            {
              text: 'toFunctionSelector',
              link: '/docs/utilities/toFunctionSelector',
            },
            {
              text: 'toFunctionSignature',
              link: '/docs/utilities/toFunctionSignature',
            },
          ],
        },
        {
          text: 'KZG',
          items: [
            {
              text: 'setupKzg',
              link: '/docs/utilities/setupKzg',
            },
          ],
        },
        {
          text: '签名',
          items: [
            {
              text: 'compactSignatureToSignature',
              link: '/docs/utilities/compactSignatureToSignature',
            },
            {
              text: 'hashMessage',
              link: '/docs/utilities/hashMessage',
            },
            {
              text: 'hashTypedData',
              link: '/docs/utilities/hashTypedData',
            },
            {
              text: 'isErc6492Signature',
              link: '/docs/utilities/isErc6492Signature',
            },
            {
              text: 'parseCompactSignature',
              link: '/docs/utilities/parseCompactSignature',
            },
            {
              text: 'parseErc6492Signature',
              link: '/docs/utilities/parseErc6492Signature',
            },
            {
              text: 'parseSignature',
              link: '/docs/utilities/parseSignature',
            },
            {
              text: 'recoverAddress',
              link: '/docs/utilities/recoverAddress',
            },
            {
              text: 'recoverMessageAddress',
              link: '/docs/utilities/recoverMessageAddress',
            },
            {
              text: 'recoverPublicKey',
              link: '/docs/utilities/recoverPublicKey',
            },
            {
              text: 'recoverTransactionAddress',
              link: '/docs/utilities/recoverTransactionAddress',
            },
            {
              text: 'recoverTypedDataAddress',
              link: '/docs/utilities/recoverTypedDataAddress',
            },
            {
              text: 'serializeCompactSignature',
              link: '/docs/utilities/serializeCompactSignature',
            },
            {
              text: 'serializeErc6492Signature',
              link: '/docs/utilities/serializeErc6492Signature',
            },
            {
              text: 'serializeSignature',
              link: '/docs/utilities/serializeSignature',
            },
            {
              text: 'signatureToCompactSignature',
              link: '/docs/utilities/signatureToCompactSignature',
            },
            {
              text: 'verifyMessage',
              link: '/docs/utilities/verifyMessage',
            },
            {
              text: 'verifyTypedData',
              link: '/docs/utilities/verifyTypedData',
            },
          ],
        },
        {
          text: '交易',
          items: [
            {
              text: 'parseTransaction',
              link: '/docs/utilities/parseTransaction',
            },
            {
              text: 'serializeTransaction',
              link: '/docs/utilities/serializeTransaction',
            },
          ],
        },
        {
          text: '单位',
          items: [
            {
              text: 'formatEther',
              link: '/docs/utilities/formatEther',
            },
            {
              text: 'formatGwei',
              link: '/docs/utilities/formatGwei',
            },
            {
              text: 'formatUnits',
              link: '/docs/utilities/formatUnits',
            },
            {
              text: 'parseEther',
              link: '/docs/utilities/parseEther',
            },
            {
              text: 'parseGwei',
              link: '/docs/utilities/parseGwei',
            },
            {
              text: 'parseUnits',
              link: '/docs/utilities/parseUnits',
            },
          ],
        },
      ],
    },
    {
      text: '术语表',
      collapsed: true,
      items: [
        { text: '术语', link: '/docs/glossary/terms' },
        { text: '类型', link: '/docs/glossary/types' },
        { text: '错误', link: '/docs/glossary/errors' },
      ],
    },
  ],
  '/account-abstraction': {
    backLink: true,
    items: [
      {
        text: '账户抽象',
        items: [
          {
            text: '入门',
            link: '/account-abstraction',
          },
        ],
      },
      {
        text: '指南',
        items: [
          {
            text: '发送用户操作',
            link: '/account-abstraction/guides/sending-user-operations',
          },
        ],
      },
      {
        text: '客户端',
        items: [
          {
            text: '捆绑器客户端',
            link: '/account-abstraction/clients/bundler',
          },
          {
            text: '支付者客户端',
            link: '/account-abstraction/clients/paymaster',
          },
        ],
      },
      {
        text: '账户',
        items: [
          {
            text: '智能账户',
            link: '/account-abstraction/accounts/smart',
            items: [
              {
                text: 'Coinbase',
                link: '/account-abstraction/accounts/smart/toCoinbaseSmartAccount',
              },
              {
                text: 'Thirdweb',
                link: '/account-abstraction/accounts/smart/toThirdwebSmartAccount',
              },
              {
                text: 'Biconomy',
                link: '/account-abstraction/accounts/smart/toNexusSmartAccount',
              },
              {
                text: 'Alchemy',
                link: '/account-abstraction/accounts/smart/toLightSmartAccount',
              },
              {
                text: 'Kernel (ZeroDev)',
                link: '/account-abstraction/accounts/smart/toEcdsaKernelSmartAccount',
              },
              {
                text: 'Safe',
                link: '/account-abstraction/accounts/smart/toSafeSmartAccount',
              },
              {
                text: 'Simple',
                link: '/account-abstraction/accounts/smart/toSimpleSmartAccount',
              },
              {
                text: 'Solady',
                link: '/account-abstraction/accounts/smart/toSoladySmartAccount',
              },
              {
                text: 'Trust',
                link: '/account-abstraction/accounts/smart/toTrustSmartAccount',
              },
              {
                text: '自定义',
                link: '/account-abstraction/accounts/smart/toSmartAccount',
              },
              {
                text: '工具',
                items: [
                  {
                    text: 'signMessage',
                    link: '/account-abstraction/accounts/smart/signMessage',
                  },
                  {
                    text: 'signTypedData',
                    link: '/account-abstraction/accounts/smart/signTypedData',
                  },
                  {
                    text: 'signUserOperation',
                    link: '/account-abstraction/accounts/smart/signUserOperation',
                  },
                ],
              },
            ],
          },
          {
            text: 'WebAuthn 账户',
            link: '/account-abstraction/accounts/webauthn',
            items: [
              {
                text: 'toWebAuthnAccount',
                link: '/account-abstraction/accounts/webauthn/toWebAuthnAccount',
              },
              {
                text: 'createWebAuthnCredential',
                link: '/account-abstraction/accounts/webauthn/createWebAuthnCredential',
              },
            ],
          },
        ],
      },
      {
        text: '捆绑器操作',
        items: [
          {
            text: 'estimateUserOperationGas',
            link: '/account-abstraction/actions/bundler/estimateUserOperationGas',
          },
          {
            text: 'getChainId',
            link: '/account-abstraction/actions/bundler/getChainId',
          },
          {
            text: 'getSupportedEntryPoints',
            link: '/account-abstraction/actions/bundler/getSupportedEntryPoints',
          },
          {
            text: 'getUserOperation',
            link: '/account-abstraction/actions/bundler/getUserOperation',
          },
          {
            text: 'getUserOperationReceipt',
            link: '/account-abstraction/actions/bundler/getUserOperationReceipt',
          },
          {
            text: 'prepareUserOperation',
            link: '/account-abstraction/actions/bundler/prepareUserOperation',
          },
          {
            text: 'sendUserOperation',
            link: '/account-abstraction/actions/bundler/sendUserOperation',
          },
          {
            text: 'waitForUserOperationReceipt',
            link: '/account-abstraction/actions/bundler/waitForUserOperationReceipt',
          },
        ],
      },
      {
        text: '支付者操作',
        items: [
          {
            text: 'getPaymasterData',
            link: '/account-abstraction/actions/paymaster/getPaymasterData',
          },
          {
            text: 'getPaymasterStubData',
            link: '/account-abstraction/actions/paymaster/getPaymasterStubData',
          },
        ],
      },
    ],
  },
  '/experimental': {
    backLink: true,
    items: [
      {
        text: '实验',
        items: [
          {
            text: '入门',
            link: '/experimental',
          },
        ],
      },
      {
        text: 'EIP-5792',
        items: [
          { text: '客户端', link: '/experimental/eip5792/client' },
          {
            text: '操作',
            items: [
              {
                text: 'getCallsStatus',
                link: '/experimental/eip5792/getCallsStatus',
              },
              {
                text: 'getCapabilities',
                link: '/experimental/eip5792/getCapabilities',
              },
              {
                text: 'sendCalls',
                link: '/experimental/eip5792/sendCalls',
              },
              {
                text: 'showCallsStatus',
                link: '/experimental/eip5792/showCallsStatus',
              },
            ],
          },
        ],
      },
      {
        text: 'EIP-7702',
        items: [
          {
            text: '概述',
            link: '/experimental/eip7702',
          },
          {
            text: '指南',
            items: [
              {
                text: '扩展客户端',
                link: '/experimental/eip7702/client',
              },
              {
                text: '合约写入',
                link: '/experimental/eip7702/contract-writes',
              },
              {
                text: '发送交易',
                link: '/experimental/eip7702/sending-transactions',
              },
            ],
          },
          {
            text: '操作',
            items: [
              {
                text: 'signAuthorization',
                link: '/experimental/eip7702/signAuthorization',
              },
            ],
          },
          {
            text: '工具',
            items: [
              {
                text: 'hashAuthorization',
                link: '/experimental/eip7702/hashAuthorization',
              },
              {
                text: 'recoverAuthorizationAddress',
                link: '/experimental/eip7702/recoverAuthorizationAddress',
              },
              {
                text: 'verifyAuthorization',
                link: '/experimental/eip7702/verifyAuthorization',
              },
            ],
          },
        ],
      },
      {
        text: 'ERC-7715',
        items: [
          {
            text: '客户端',
            link: '/experimental/erc7715/client',
          },
          {
            text: '操作',
            items: [
              {
                text: 'grantPermissions',
                link: '/experimental/erc7715/grantPermissions',
              },
            ],
          },
        ],
      },
      {
        text: 'ERC-7739',
        items: [
          {
            text: '客户端',
            link: '/experimental/erc7739/client',
          },
          {
            text: '操作',
            items: [
              {
                text: 'signMessage',
                link: '/experimental/erc7739/signMessage',
              },
              {
                text: 'signTypedData',
                link: '/experimental/erc7739/signTypedData',
              },
            ],
          },
          {
            text: '工具',
            items: [
              {
                text: 'hashMessage',
                link: '/experimental/solady/hashMessage',
              },
              {
                text: 'hashTypedData',
                link: '/experimental/solady/hashTypedData',
              },
              {
                text: 'wrapTypedDataSignature',
                link: '/experimental/solady/wrapTypedDataSignature',
              },
            ],
          },
        ],
      },
    ],
  },
  '/op-stack': {
    backLink: true,
    items: [
      {
        text: 'OP 堆栈',
        items: [
          {
            text: '入门',
            link: '/op-stack',
          },
          { text: '客户端', link: '/op-stack/client' },
          { text: '链', link: '/op-stack/chains' },
        ],
      },
      {
        text: '指南',
        items: [
          {
            text: '存款',
            link: '/op-stack/guides/deposits',
          },
          {
            text: '取款',
            link: '/op-stack/guides/withdrawals',
          },
        ],
      },
      {
        text: 'L2 公共操作',
        items: [
          {
            text: 'buildDepositTransaction',
            link: '/op-stack/actions/buildDepositTransaction',
          },
          {
            text: 'buildProveWithdrawal',
            link: '/op-stack/actions/buildProveWithdrawal',
          },
          {
            text: 'estimateContractL1Fee',
            link: '/op-stack/actions/estimateContractL1Fee',
          },
          {
            text: 'estimateContractL1Gas',
            link: '/op-stack/actions/estimateContractL1Gas',
          },
          {
            text: 'estimateContractTotalFee',
            link: '/op-stack/actions/estimateContractTotalFee',
          },
          {
            text: 'estimateContractTotalGas',
            link: '/op-stack/actions/estimateContractTotalGas',
          },
          {
            text: 'estimateInitiateWithdrawalGas',
            link: '/op-stack/actions/estimateInitiateWithdrawalGas',
          },
          {
            text: 'estimateL1Fee',
            link: '/op-stack/actions/estimateL1Fee',
          },
          {
            text: 'estimateL1Gas',
            link: '/op-stack/actions/estimateL1Gas',
          },
          {
            text: 'estimateTotalFee',
            link: '/op-stack/actions/estimateTotalFee',
          },
          {
            text: 'estimateTotalGas',
            link: '/op-stack/actions/estimateTotalGas',
          },
        ],
      },
      {
        text: 'L2 钱包操作',
        items: [
          {
            text: 'initiateWithdrawal',
            link: '/op-stack/actions/initiateWithdrawal',
          },
        ],
      },
      {
        text: 'L1 公共操作',
        items: [
          {
            text: 'buildInitiateWithdrawal',
            link: '/op-stack/actions/buildInitiateWithdrawal',
          },
          {
            text: 'estimateDepositTransactionGas',
            link: '/op-stack/actions/estimateDepositTransactionGas',
          },
          {
            text: 'estimateFinalizeWithdrawalGas',
            link: '/op-stack/actions/estimateFinalizeWithdrawalGas',
          },
          {
            text: 'estimateProveWithdrawalGas',
            link: '/op-stack/actions/estimateProveWithdrawalGas',
          },
          {
            text: 'getGame',
            link: '/op-stack/actions/getGame',
          },
          {
            text: 'getGames',
            link: '/op-stack/actions/getGames',
          },
          {
            text: 'getL2Output',
            link: '/op-stack/actions/getL2Output',
          },
          {
            text: 'getTimeToFinalize',
            link: '/op-stack/actions/getTimeToFinalize',
          },
          {
            text: 'getTimeToNextGame',
            link: '/op-stack/actions/getTimeToNextGame',
          },
          {
            text: 'getTimeToNextL2Output',
            link: '/op-stack/actions/getTimeToNextL2Output',
          },
          {
            text: 'getTimeToProve',
            link: '/op-stack/actions/getTimeToProve',
          },
          {
            text: 'getWithdrawalStatus',
            link: '/op-stack/actions/getWithdrawalStatus',
          },
          {
            text: 'waitForNextGame',
            link: '/op-stack/actions/waitForNextGame',
          },
          {
            text: 'waitForNextL2Output',
            link: '/op-stack/actions/waitForNextL2Output',
          },
          {
            text: 'waitToFinalize',
            link: '/op-stack/actions/waitToFinalize',
          },
          {
            text: 'waitToProve',
            link: '/op-stack/actions/waitToProve',
          },
        ],
      },
      {
        text: 'L1 钱包操作',
        items: [
          {
            text: 'depositTransaction',
            link: '/op-stack/actions/depositTransaction',
          },
          {
            text: 'finalizeWithdrawal',
            link: '/op-stack/actions/finalizeWithdrawal',
          },
          {
            text: 'proveWithdrawal',
            link: '/op-stack/actions/proveWithdrawal',
          },
        ],
      },
      {
        text: '工具',
        items: [
          {
            text: 'extractTransactionDepositedLogs',
            link: '/op-stack/utilities/extractTransactionDepositedLogs',
          },
          {
            text: 'extractWithdrawalMessageLogs',
            link: '/op-stack/utilities/extractWithdrawalMessageLogs',
          },
          {
            text: 'getL2TransactionHash',
            link: '/op-stack/utilities/getL2TransactionHash',
          },
          {
            text: 'getL2TransactionHashes',
            link: '/op-stack/utilities/getL2TransactionHashes',
          },
          {
            text: 'getWithdrawals',
            link: '/op-stack/utilities/getWithdrawals',
          },
          {
            text: 'getSourceHash',
            link: '/op-stack/utilities/getSourceHash',
          },
          {
            text: 'opaqueDataToDepositData',
            link: '/op-stack/utilities/opaqueDataToDepositData',
          },
          {
            text: 'getWithdrawalHashStorageSlot',
            link: '/op-stack/utilities/getWithdrawalHashStorageSlot',
          },
          {
            text: 'parseTransaction',
            link: '/op-stack/utilities/parseTransaction',
          },
          {
            text: 'serializeTransaction',
            link: '/op-stack/utilities/serializeTransaction',
          },
        ],
      },
    ],
  },
  '/zksync': {
    backLink: true,
    items: [
      {
        text: 'ZKsync',
        items: [
          {
            text: '入门',
            link: '/zksync',
          },
          { text: '客户端', link: '/zksync/client' },
          { text: '链', link: '/zksync/chains' },
        ],
      },
      {
        text: '智能账户',
        items: [
          {
            text: '单签',
            link: '/zksync/accounts/toSinglesigSmartAccount',
          },
          {
            text: '多签',
            link: '/zksync/accounts/toMultisigSmartAccount',
          },
          {
            text: '自定义',
            link: '/zksync/accounts/toSmartAccount',
          },
        ],
      },
      {
        text: 'EIP-712 操作',
        items: [
          {
            text: 'deployContract',
            link: '/zksync/actions/deployContract',
          },
          {
            text: 'sendTransaction',
            link: '/zksync/actions/sendTransaction',
          },
          {
            text: 'signTransaction',
            link: '/zksync/actions/signTransaction',
          },
          {
            text: 'writeContract',
            link: '/zksync/actions/writeContract',
          },
        ],
      },
      {
        text: 'L2 公共操作',
        items: [
          {
            text: 'estimateFee',
            link: '/zksync/actions/estimateFee',
          },
          {
            text: 'estimateGasL1ToL2',
            link: '/zksync/actions/estimateGasL1ToL2',
          },
          {
            text: 'getAllBalances',
            link: '/zksync/actions/getAllBalances',
          },
          {
            text: 'getBaseTokenL1Address',
            link: '/zksync/actions/getBaseTokenL1Address',
          },
          {
            text: 'getBlockDetails',
            link: '/zksync/actions/getBlockDetails',
          },
          {
            text: 'getBridgehubContractAddress',
            link: '/zksync/actions/getBridgehubContractAddress',
          },
          {
            text: 'getDefaultBridgeAddress',
            link: '/zksync/actions/getDefaultBridgeAddress',
          },
          {
            text: 'getL1BatchDetails',
            link: '/zksync/actions/getL1BatchDetails',
          },
          {
            text: 'getL1BatchBlockRange',
            link: '/zksync/actions/getL1BatchBlockRange',
          },
          {
            text: 'getL1BatchNumber',
            link: '/zksync/actions/getL1BatchNumber',
          },
          {
            text: 'getL1ChainId',
            link: '/zksync/actions/getL1ChainId',
          },
          {
            text: 'getLogProof',
            link: '/zksync/actions/getLogProof',
          },
          {
            text: 'getMainContractAddress',
            link: '/zksync/actions/getMainContractAddress',
          },
          {
            text: 'getRawBlockTransaction',
            link: '/zksync/actions/getRawBlockTransactions',
          },
          {
            text: 'getTestnetPaymasterAddress',
            link: '/zksync/actions/getTestnetPaymasterAddress',
          },
          {
            text: 'getTransactionDetails',
            link: '/zksync/actions/getTransactionDetails',
          },
        ],
      },
      {
        text: 'L1 公共操作',
        items: [
          {
            text: 'getL1Allowance',
            link: '/zksync/actions/getL1Allowance',
          },
          {
            text: 'getL1Balance',
            link: '/zksync/actions/getL1Balance',
          },
          {
            text: 'getL1TokenBalance',
            link: '/zksync/actions/getL1TokenBalance',
          },
        ],
      },
      {
        text: '工具',
        items: [
          {
            text: '支付者',
            items: [
              {
                text: 'getApprovalBasedPaymasterInput',
                link: '/zksync/utilities/paymaster/getApprovalBasedPaymasterInput',
              },
              {
                text: 'getGeneralPaymasterInput',
                link: '/zksync/utilities/paymaster/getGeneralPaymasterInput',
              },
            ],
          },
          {
            text: 'parseEip712Transaction',
            link: '/zksync/utilities/parseEip712Transaction',
          },
        ],
      },
    ],
  },
} as const satisfies Sidebar
