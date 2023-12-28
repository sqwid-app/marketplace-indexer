import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './SqwidMarketplace.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    BalanceUpdated: new LogEvent<([addr: string, value: bigint] & {addr: string, value: bigint})>(
        abi, '0x8ad64a0ac7700dd8425ab0499f107cb6e2cd1581d803c5b8c1c79dcb8190b1af'
    ),
    BidCreated: new LogEvent<([positionId: bigint, bidder: string, value: bigint] & {positionId: bigint, bidder: string, value: bigint})>(
        abi, '0x0bda7f7cf42011b27b057b83f3bf21f963b84eb591478e6b413b18d7872cd37a'
    ),
    ItemCreated: new LogEvent<([itemId: bigint, nftContract: string, tokenId: bigint, creator: string] & {itemId: bigint, nftContract: string, tokenId: bigint, creator: string})>(
        abi, '0x881d44181c5dc599c13d348b8357fb8944259020c07c679896939cbeb050681e'
    ),
    LoanFunded: new LogEvent<([positionId: bigint, funder: string] & {positionId: bigint, funder: string})>(
        abi, '0x15feab5d3eb17171632762cf769709a315dd15f487a556c0dfb8a259c8f186cc'
    ),
    MarketItemSold: new LogEvent<([itemId: bigint, nftContract: string, tokenId: bigint, seller: string, buyer: string, price: bigint, amount: bigint] & {itemId: bigint, nftContract: string, tokenId: bigint, seller: string, buyer: string, price: bigint, amount: bigint})>(
        abi, '0x245843c5d83f5834a63f6f98486094cecafdd601444424c083e66fd55f82c51d'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    PositionDelete: new LogEvent<([positionId: bigint] & {positionId: bigint})>(
        abi, '0xeff90ca166abe0b150d2037fae79720bcb375924a8054de2af5d7d24d7c45127'
    ),
    PositionUpdate: new LogEvent<([positionId: bigint, itemId: bigint, owner: string, amount: bigint, price: bigint, marketFee: bigint, state: number] & {positionId: bigint, itemId: bigint, owner: string, amount: bigint, price: bigint, marketFee: bigint, state: number})>(
        abi, '0x4aeec3ce160b91edb76c243eba54b14d0ec8dd3332254ff99f79eb00d17b5683'
    ),
    RaffleEntered: new LogEvent<([positionId: bigint, addr: string, value: bigint] & {positionId: bigint, addr: string, value: bigint})>(
        abi, '0x31ed7968c068023ef5cbf0834bb1d883bedc82dc6e9e44065bc1919184dded35'
    ),
}

export const functions = {
    addAvailableTokens: new Func<[itemId: bigint], {itemId: bigint}, []>(
        abi, '0xe6b36012'
    ),
    addressBalance: new Func<[_: string], {}, bigint>(
        abi, '0x3ec4de35'
    ),
    createBid: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0x659dd2b4'
    ),
    createItem: new Func<[tokenId: bigint], {tokenId: bigint}, bigint>(
        abi, '0xd7a5d5d3'
    ),
    createItemAuction: new Func<[itemId: bigint, amount: bigint, numMinutes: bigint, minBid: bigint], {itemId: bigint, amount: bigint, numMinutes: bigint, minBid: bigint}, []>(
        abi, '0x5f4ae871'
    ),
    createItemLoan: new Func<[itemId: bigint, loanAmount: bigint, feeAmount: bigint, tokenAmount: bigint, numMinutes: bigint], {itemId: bigint, loanAmount: bigint, feeAmount: bigint, tokenAmount: bigint, numMinutes: bigint}, []>(
        abi, '0xed983982'
    ),
    createItemRaffle: new Func<[itemId: bigint, amount: bigint, numMinutes: bigint], {itemId: bigint, amount: bigint, numMinutes: bigint}, []>(
        abi, '0x201ff9d6'
    ),
    createSale: new Func<[positionId: bigint, amount: bigint], {positionId: bigint, amount: bigint}, []>(
        abi, '0x6019061b'
    ),
    currentItemId: new Func<[], {}, bigint>(
        abi, '0xdfe0a9b1'
    ),
    currentPositionId: new Func<[], {}, bigint>(
        abi, '0x1131c8cd'
    ),
    endAuction: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0xb9a2de3a'
    ),
    endRaffle: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0x9def429d'
    ),
    enterRaffle: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0x2e519f90'
    ),
    fetchAuctionData: new Func<[positionId: bigint], {positionId: bigint}, ([deadline: bigint, minBid: bigint, highestBidder: string, highestBid: bigint, totalAddresses: bigint] & {deadline: bigint, minBid: bigint, highestBidder: string, highestBid: bigint, totalAddresses: bigint})>(
        abi, '0x39abc46e'
    ),
    fetchBid: new Func<[positionId: bigint, bidIndex: bigint], {positionId: bigint, bidIndex: bigint}, [_: string, _: bigint]>(
        abi, '0x31e98976'
    ),
    fetchItem: new Func<[itemId: bigint], {itemId: bigint}, ([itemId: bigint, nftContract: string, tokenId: bigint, creator: string, positionCount: bigint, sales: Array<([seller: string, buyer: string, price: bigint, amount: bigint] & {seller: string, buyer: string, price: bigint, amount: bigint})>] & {itemId: bigint, nftContract: string, tokenId: bigint, creator: string, positionCount: bigint, sales: Array<([seller: string, buyer: string, price: bigint, amount: bigint] & {seller: string, buyer: string, price: bigint, amount: bigint})>})>(
        abi, '0xad4b9cfb'
    ),
    fetchLoanData: new Func<[positionId: bigint], {positionId: bigint}, ([loanAmount: bigint, feeAmount: bigint, numMinutes: bigint, deadline: bigint, lender: string] & {loanAmount: bigint, feeAmount: bigint, numMinutes: bigint, deadline: bigint, lender: string})>(
        abi, '0xdb53fc1f'
    ),
    fetchPosition: new Func<[positionId: bigint], {positionId: bigint}, ([positionId: bigint, itemId: bigint, owner: string, amount: bigint, price: bigint, marketFee: bigint, state: number] & {positionId: bigint, itemId: bigint, owner: string, amount: bigint, price: bigint, marketFee: bigint, state: number})>(
        abi, '0x68f5f0ec'
    ),
    fetchRaffleData: new Func<[positionId: bigint], {positionId: bigint}, ([deadline: bigint, totalValue: bigint, totalAddresses: bigint] & {deadline: bigint, totalValue: bigint, totalAddresses: bigint})>(
        abi, '0x9a859f05'
    ),
    fetchRaffleEntry: new Func<[positionId: bigint, entryIndex: bigint], {positionId: bigint, entryIndex: bigint}, [_: string, _: bigint]>(
        abi, '0x85bb0ae2'
    ),
    fetchStateCount: new Func<[state: number], {state: number}, bigint>(
        abi, '0x643721bf'
    ),
    fundLoan: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0x846b909a'
    ),
    liquidateLoan: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0xccdd9f5d'
    ),
    marketFees: new Func<[_: number], {}, bigint>(
        abi, '0x1fadc33f'
    ),
    mint: new Func<[amount: bigint, tokenURI: string, mimeType: string, royaltyRecipient: string, royaltyValue: bigint], {amount: bigint, tokenURI: string, mimeType: string, royaltyRecipient: string, royaltyValue: bigint}, []>(
        abi, '0xf514ae8a'
    ),
    mintBatch: new Func<[amounts: Array<bigint>, tokenURIs: Array<string>, mimeTypes: Array<string>, royaltyRecipients: Array<string>, royaltyValues: Array<bigint>], {amounts: Array<bigint>, tokenURIs: Array<string>, mimeTypes: Array<string>, royaltyRecipients: Array<string>, royaltyValues: Array<bigint>}, []>(
        abi, '0xb4a1bcea'
    ),
    onERC1155BatchReceived: new Func<[_: string, _: string, _: Array<bigint>, _: Array<bigint>, _: string], {}, string>(
        abi, '0xbc197c81'
    ),
    onERC1155Received: new Func<[_: string, _: string, _: bigint, _: bigint, _: string], {}, string>(
        abi, '0xf23a6e61'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    putItemOnSale: new Func<[itemId: bigint, amount: bigint, price: bigint], {itemId: bigint, amount: bigint, price: bigint}, []>(
        abi, '0x3d53e5f4'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    repayLoan: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0xab7b1c89'
    ),
    setMarketFee: new Func<[marketFee_: number, typeFee: number], {marketFee_: number, typeFee: number}, []>(
        abi, '0x43fa8d01'
    ),
    setMigratorAddress: new Func<[sqwidMigrator_: string], {sqwidMigrator_: string}, []>(
        abi, '0x5754f814'
    ),
    setNftContractAddress: new Func<[sqwidERC1155_: string], {sqwidERC1155_: string}, []>(
        abi, '0xda31d640'
    ),
    sqwidERC1155: new Func<[], {}, string>(
        abi, '0x2c3b7d61'
    ),
    sqwidMigrator: new Func<[], {}, string>(
        abi, '0xceaf0eab'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    unlistLoanProposal: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0x9d8b65a1'
    ),
    unlistPositionOnSale: new Func<[positionId: bigint], {positionId: bigint}, []>(
        abi, '0x13c39a09'
    ),
    withdraw: new Func<[], {}, []>(
        abi, '0x3ccfd60b'
    ),
}

export class Contract extends ContractBase {

    addressBalance(arg0: string): Promise<bigint> {
        return this.eth_call(functions.addressBalance, [arg0])
    }

    currentItemId(): Promise<bigint> {
        return this.eth_call(functions.currentItemId, [])
    }

    currentPositionId(): Promise<bigint> {
        return this.eth_call(functions.currentPositionId, [])
    }

    fetchAuctionData(positionId: bigint): Promise<([deadline: bigint, minBid: bigint, highestBidder: string, highestBid: bigint, totalAddresses: bigint] & {deadline: bigint, minBid: bigint, highestBidder: string, highestBid: bigint, totalAddresses: bigint})> {
        return this.eth_call(functions.fetchAuctionData, [positionId])
    }

    fetchBid(positionId: bigint, bidIndex: bigint): Promise<[_: string, _: bigint]> {
        return this.eth_call(functions.fetchBid, [positionId, bidIndex])
    }

    fetchItem(itemId: bigint): Promise<([itemId: bigint, nftContract: string, tokenId: bigint, creator: string, positionCount: bigint, sales: Array<([seller: string, buyer: string, price: bigint, amount: bigint] & {seller: string, buyer: string, price: bigint, amount: bigint})>] & {itemId: bigint, nftContract: string, tokenId: bigint, creator: string, positionCount: bigint, sales: Array<([seller: string, buyer: string, price: bigint, amount: bigint] & {seller: string, buyer: string, price: bigint, amount: bigint})>})> {
        return this.eth_call(functions.fetchItem, [itemId])
    }

    fetchLoanData(positionId: bigint): Promise<([loanAmount: bigint, feeAmount: bigint, numMinutes: bigint, deadline: bigint, lender: string] & {loanAmount: bigint, feeAmount: bigint, numMinutes: bigint, deadline: bigint, lender: string})> {
        return this.eth_call(functions.fetchLoanData, [positionId])
    }

    fetchPosition(positionId: bigint): Promise<([positionId: bigint, itemId: bigint, owner: string, amount: bigint, price: bigint, marketFee: bigint, state: number] & {positionId: bigint, itemId: bigint, owner: string, amount: bigint, price: bigint, marketFee: bigint, state: number})> {
        return this.eth_call(functions.fetchPosition, [positionId])
    }

    fetchRaffleData(positionId: bigint): Promise<([deadline: bigint, totalValue: bigint, totalAddresses: bigint] & {deadline: bigint, totalValue: bigint, totalAddresses: bigint})> {
        return this.eth_call(functions.fetchRaffleData, [positionId])
    }

    fetchRaffleEntry(positionId: bigint, entryIndex: bigint): Promise<[_: string, _: bigint]> {
        return this.eth_call(functions.fetchRaffleEntry, [positionId, entryIndex])
    }

    fetchStateCount(state: number): Promise<bigint> {
        return this.eth_call(functions.fetchStateCount, [state])
    }

    marketFees(arg0: number): Promise<bigint> {
        return this.eth_call(functions.marketFees, [arg0])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    sqwidERC1155(): Promise<string> {
        return this.eth_call(functions.sqwidERC1155, [])
    }

    sqwidMigrator(): Promise<string> {
        return this.eth_call(functions.sqwidMigrator, [])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }
}
