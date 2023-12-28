export const ABI_JSON = [
    {
        "type": "event",
        "anonymous": false,
        "name": "ApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": true
            },
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "approved",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TransferBatch",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "ids"
            },
            {
                "type": "uint256[]",
                "name": "values"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TransferSingle",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "URI",
        "inputs": [
            {
                "type": "string",
                "name": "value",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "WrapToken",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "isErc721",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "extTokenId",
                "indexed": false
            },
            {
                "type": "address",
                "name": "extNftContract",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "wrapped",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_ROYALTY_VALUE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "balanceOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "uint256",
                "name": "id"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "balanceOfBatch",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "accounts"
            },
            {
                "type": "uint256[]",
                "name": "ids"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "burn",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "uint256",
                "name": "id"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "burnBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "uint256[]",
                "name": "ids"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getOwners",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "id"
            }
        ],
        "outputs": [
            {
                "type": "address[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokenSupply",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_id"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokensByOwner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getWrappedToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "name": "",
                "components": [
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    },
                    {
                        "type": "bool",
                        "name": "isErc721"
                    },
                    {
                        "type": "uint256",
                        "name": "extTokenId"
                    },
                    {
                        "type": "address",
                        "name": "extNftContract"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
            },
            {
                "type": "address",
                "name": "operator"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "mimeType",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "mint",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "string",
                "name": "tokenURI"
            },
            {
                "type": "string",
                "name": "mimeType_"
            },
            {
                "type": "address",
                "name": "royaltyRecipient"
            },
            {
                "type": "uint256",
                "name": "royaltyValue"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "mintBatch",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "string[]",
                "name": "tokenURIs"
            },
            {
                "type": "string[]",
                "name": "mimeTypes"
            },
            {
                "type": "address[]",
                "name": "royaltyRecipients"
            },
            {
                "type": "uint256[]",
                "name": "royaltyValues"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "onERC1155BatchReceived",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "uint256[]",
                "name": ""
            },
            {
                "type": "uint256[]",
                "name": ""
            },
            {
                "type": "bytes",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bytes4",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "onERC1155Received",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "bytes",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bytes4",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "onERC721Received",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "bytes",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bytes4",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "owner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "royaltyInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "saleValue"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "receiver"
            },
            {
                "type": "uint256",
                "name": "royaltyAmount"
            }
        ]
    },
    {
        "type": "function",
        "name": "safeBatchTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256[]",
                "name": "ids"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "id"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            },
            {
                "type": "bool",
                "name": "approved"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setValidMimeType",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "mimeType_"
            },
            {
                "type": "bool",
                "name": "valid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unwrapERC1155",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unwrapERC721",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "uri",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "validMimeTypes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "wrapERC1155",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "extNftContract"
            },
            {
                "type": "uint256",
                "name": "extTokenId"
            },
            {
                "type": "string",
                "name": "mimeType_"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "wrapERC721",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "extNftContract"
            },
            {
                "type": "uint256",
                "name": "extTokenId"
            },
            {
                "type": "string",
                "name": "mimeType_"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    }
]
