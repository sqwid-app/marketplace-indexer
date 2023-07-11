export const ABI_JSON = [
    {
        "type": "constructor",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "marketFee_"
            },
            {
                "type": "address",
                "name": "sqwidERC1155_"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "BalanceUpdated",
        "inputs": [
            {
                "type": "address",
                "name": "addr",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "BidCreated",
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "bidder",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ItemCreated",
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "nftContract",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "creator",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "LoanFunded",
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "funder",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "MarketItemSold",
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "nftContract",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "seller",
                "indexed": false
            },
            {
                "type": "address",
                "name": "buyer",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount",
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
        "name": "PositionDelete",
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PositionUpdate",
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "itemId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "price",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "marketFee",
                "indexed": false
            },
            {
                "type": "uint8",
                "name": "state",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RaffleEntered",
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId",
                "indexed": true
            },
            {
                "type": "address",
                "name": "addr",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "addAvailableTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addressBalance",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "createBid",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "createItem",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "createItemAuction",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256",
                "name": "numMinutes"
            },
            {
                "type": "uint256",
                "name": "minBid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "createItemLoan",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId"
            },
            {
                "type": "uint256",
                "name": "loanAmount"
            },
            {
                "type": "uint256",
                "name": "feeAmount"
            },
            {
                "type": "uint256",
                "name": "tokenAmount"
            },
            {
                "type": "uint256",
                "name": "numMinutes"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "createItemRaffle",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256",
                "name": "numMinutes"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "createSale",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
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
        "name": "currentItemId",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "currentPositionId",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "endAuction",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "endRaffle",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "enterRaffle",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "fetchAuctionData",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "components": [
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "minBid"
                    },
                    {
                        "type": "address",
                        "name": "highestBidder"
                    },
                    {
                        "type": "uint256",
                        "name": "highestBid"
                    },
                    {
                        "type": "uint256",
                        "name": "totalAddresses"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchBid",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            },
            {
                "type": "uint256",
                "name": "bidIndex"
            }
        ],
        "outputs": [
            {
                "type": "address"
            },
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchItem",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "components": [
                    {
                        "type": "uint256",
                        "name": "itemId"
                    },
                    {
                        "type": "address",
                        "name": "nftContract"
                    },
                    {
                        "type": "uint256",
                        "name": "tokenId"
                    },
                    {
                        "type": "address",
                        "name": "creator"
                    },
                    {
                        "type": "uint256",
                        "name": "positionCount"
                    },
                    {
                        "type": "tuple[]",
                        "name": "sales",
                        "components": [
                            {
                                "type": "address",
                                "name": "seller"
                            },
                            {
                                "type": "address",
                                "name": "buyer"
                            },
                            {
                                "type": "uint256",
                                "name": "price"
                            },
                            {
                                "type": "uint256",
                                "name": "amount"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchLoanData",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "components": [
                    {
                        "type": "uint256",
                        "name": "loanAmount"
                    },
                    {
                        "type": "uint256",
                        "name": "feeAmount"
                    },
                    {
                        "type": "uint256",
                        "name": "numMinutes"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "address",
                        "name": "lender"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchPosition",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "components": [
                    {
                        "type": "uint256",
                        "name": "positionId"
                    },
                    {
                        "type": "uint256",
                        "name": "itemId"
                    },
                    {
                        "type": "address",
                        "name": "owner"
                    },
                    {
                        "type": "uint256",
                        "name": "amount"
                    },
                    {
                        "type": "uint256",
                        "name": "price"
                    },
                    {
                        "type": "uint256",
                        "name": "marketFee"
                    },
                    {
                        "type": "uint8",
                        "name": "state"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchRaffleData",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "components": [
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "totalValue"
                    },
                    {
                        "type": "uint256",
                        "name": "totalAddresses"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchRaffleEntry",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            },
            {
                "type": "uint256",
                "name": "entryIndex"
            }
        ],
        "outputs": [
            {
                "type": "address"
            },
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "fetchStateCount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "state"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "fundLoan",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "liquidateLoan",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "marketFees",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
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
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "string",
                "name": "tokenURI"
            },
            {
                "type": "string",
                "name": "mimeType"
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
        "outputs": []
    },
    {
        "type": "function",
        "name": "mintBatch",
        "constant": false,
        "payable": false,
        "inputs": [
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
        "outputs": []
    },
    {
        "type": "function",
        "name": "onERC1155BatchReceived",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address"
            },
            {
                "type": "address"
            },
            {
                "type": "uint256[]"
            },
            {
                "type": "uint256[]"
            },
            {
                "type": "bytes"
            }
        ],
        "outputs": [
            {
                "type": "bytes4"
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
                "type": "address"
            },
            {
                "type": "address"
            },
            {
                "type": "uint256"
            },
            {
                "type": "uint256"
            },
            {
                "type": "bytes"
            }
        ],
        "outputs": [
            {
                "type": "bytes4"
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
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "putItemOnSale",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "itemId"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256",
                "name": "price"
            }
        ],
        "outputs": []
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
        "name": "repayLoan",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setMarketFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "marketFee_"
            },
            {
                "type": "uint8",
                "name": "typeFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setMigratorAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "sqwidMigrator_"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setNftContractAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "sqwidERC1155_"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "sqwidERC1155",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "sqwidMigrator",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
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
                "type": "bool"
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
        "name": "unlistLoanProposal",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unlistPositionOnSale",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "positionId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "withdraw",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    }
]
