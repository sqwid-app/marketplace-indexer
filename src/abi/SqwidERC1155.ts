import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './SqwidERC1155.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    ApprovalForAll: new LogEvent<([account: string, operator: string, approved: boolean] & {account: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    TransferBatch: new LogEvent<([operator: string, from: string, to: string, ids: Array<bigint>, values: Array<bigint>] & {operator: string, from: string, to: string, ids: Array<bigint>})>(
        abi, '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb'
    ),
    TransferSingle: new LogEvent<([operator: string, from: string, to: string, id: bigint, value: bigint] & {operator: string, from: string, to: string, id: bigint, value: bigint})>(
        abi, '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62'
    ),
    URI: new LogEvent<([value: string, id: bigint] & {value: string, id: bigint})>(
        abi, '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b'
    ),
    WrapToken: new LogEvent<([tokenId: bigint, isErc721: boolean, extTokenId: bigint, extNftContract: string, amount: bigint, wrapped: boolean] & {tokenId: bigint, isErc721: boolean, extTokenId: bigint, extNftContract: string, amount: bigint, wrapped: boolean})>(
        abi, '0x1d192f24083e272060b4a5cb467949d52c069de89db73d5be0bc9ce4c30886c7'
    ),
}

export const functions = {
    MAX_ROYALTY_VALUE: new Func<[], {}, bigint>(
        abi, '0x1e70ae4e'
    ),
    balanceOf: new Func<[account: string, id: bigint], {account: string, id: bigint}, bigint>(
        abi, '0x00fdd58e'
    ),
    balanceOfBatch: new Func<[accounts: Array<string>, ids: Array<bigint>], {accounts: Array<string>, ids: Array<bigint>}, Array<bigint>>(
        abi, '0x4e1273f4'
    ),
    burn: new Func<[account: string, id: bigint, amount: bigint], {account: string, id: bigint, amount: bigint}, []>(
        abi, '0xf5298aca'
    ),
    burnBatch: new Func<[account: string, ids: Array<bigint>, amounts: Array<bigint>], {account: string, ids: Array<bigint>, amounts: Array<bigint>}, []>(
        abi, '0x6b20c454'
    ),
    getOwners: new Func<[id: bigint], {id: bigint}, Array<string>>(
        abi, '0xee4525d5'
    ),
    getTokenSupply: new Func<[_id: bigint], {_id: bigint}, bigint>(
        abi, '0x19b88edb'
    ),
    getTokensByOwner: new Func<[owner: string], {owner: string}, Array<bigint>>(
        abi, '0x40398d67'
    ),
    getWrappedToken: new Func<[tokenId: bigint], {tokenId: bigint}, ([tokenId: bigint, isErc721: boolean, extTokenId: bigint, extNftContract: string] & {tokenId: bigint, isErc721: boolean, extTokenId: bigint, extNftContract: string})>(
        abi, '0xb8cac62b'
    ),
    isApprovedForAll: new Func<[account: string, operator: string], {account: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    mimeType: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0xe4676308'
    ),
    mint: new Func<[to: string, amount: bigint, tokenURI: string, mimeType_: string, royaltyRecipient: string, royaltyValue: bigint], {to: string, amount: bigint, tokenURI: string, mimeType_: string, royaltyRecipient: string, royaltyValue: bigint}, bigint>(
        abi, '0xc23c7413'
    ),
    mintBatch: new Func<[to: string, amounts: Array<bigint>, tokenURIs: Array<string>, mimeTypes: Array<string>, royaltyRecipients: Array<string>, royaltyValues: Array<bigint>], {to: string, amounts: Array<bigint>, tokenURIs: Array<string>, mimeTypes: Array<string>, royaltyRecipients: Array<string>, royaltyValues: Array<bigint>}, Array<bigint>>(
        abi, '0x83563d92'
    ),
    onERC1155BatchReceived: new Func<[_: string, _: string, _: Array<bigint>, _: Array<bigint>, _: string], {}, string>(
        abi, '0xbc197c81'
    ),
    onERC1155Received: new Func<[_: string, _: string, _: bigint, _: bigint, _: string], {}, string>(
        abi, '0xf23a6e61'
    ),
    onERC721Received: new Func<[_: string, _: string, _: bigint, _: string], {}, string>(
        abi, '0x150b7a02'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    royaltyInfo: new Func<[tokenId: bigint, saleValue: bigint], {tokenId: bigint, saleValue: bigint}, ([receiver: string, royaltyAmount: bigint] & {receiver: string, royaltyAmount: bigint})>(
        abi, '0x2a55205a'
    ),
    safeBatchTransferFrom: new Func<[from: string, to: string, ids: Array<bigint>, amounts: Array<bigint>, data: string], {from: string, to: string, ids: Array<bigint>, amounts: Array<bigint>, data: string}, []>(
        abi, '0x2eb2c2d6'
    ),
    safeTransferFrom: new Func<[from: string, to: string, id: bigint, amount: bigint, data: string], {from: string, to: string, id: bigint, amount: bigint, data: string}, []>(
        abi, '0xf242432a'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setValidMimeType: new Func<[mimeType_: string, valid: boolean], {mimeType_: string, valid: boolean}, []>(
        abi, '0x1372bfc3'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    unwrapERC1155: new Func<[tokenId: bigint], {tokenId: bigint}, []>(
        abi, '0xa36ab555'
    ),
    unwrapERC721: new Func<[tokenId: bigint], {tokenId: bigint}, []>(
        abi, '0x1f1e378b'
    ),
    uri: new Func<[tokenId: bigint], {tokenId: bigint}, string>(
        abi, '0x0e89341c'
    ),
    validMimeTypes: new Func<[_: string], {}, boolean>(
        abi, '0x22b3e1df'
    ),
    wrapERC1155: new Func<[extNftContract: string, extTokenId: bigint, mimeType_: string, amount: bigint], {extNftContract: string, extTokenId: bigint, mimeType_: string, amount: bigint}, bigint>(
        abi, '0x7275ae07'
    ),
    wrapERC721: new Func<[extNftContract: string, extTokenId: bigint, mimeType_: string], {extNftContract: string, extTokenId: bigint, mimeType_: string}, bigint>(
        abi, '0x090a3282'
    ),
}

export class Contract extends ContractBase {

    MAX_ROYALTY_VALUE(): Promise<bigint> {
        return this.eth_call(functions.MAX_ROYALTY_VALUE, [])
    }

    balanceOf(account: string, id: bigint): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account, id])
    }

    balanceOfBatch(accounts: Array<string>, ids: Array<bigint>): Promise<Array<bigint>> {
        return this.eth_call(functions.balanceOfBatch, [accounts, ids])
    }

    getOwners(id: bigint): Promise<Array<string>> {
        return this.eth_call(functions.getOwners, [id])
    }

    getTokenSupply(_id: bigint): Promise<bigint> {
        return this.eth_call(functions.getTokenSupply, [_id])
    }

    getTokensByOwner(owner: string): Promise<Array<bigint>> {
        return this.eth_call(functions.getTokensByOwner, [owner])
    }

    getWrappedToken(tokenId: bigint): Promise<([tokenId: bigint, isErc721: boolean, extTokenId: bigint, extNftContract: string] & {tokenId: bigint, isErc721: boolean, extTokenId: bigint, extNftContract: string})> {
        return this.eth_call(functions.getWrappedToken, [tokenId])
    }

    isApprovedForAll(account: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [account, operator])
    }

    mimeType(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.mimeType, [tokenId])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    royaltyInfo(tokenId: bigint, saleValue: bigint): Promise<([receiver: string, royaltyAmount: bigint] & {receiver: string, royaltyAmount: bigint})> {
        return this.eth_call(functions.royaltyInfo, [tokenId, saleValue])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    uri(tokenId: bigint): Promise<string> {
        return this.eth_call(functions.uri, [tokenId])
    }

    validMimeTypes(arg0: string): Promise<boolean> {
        return this.eth_call(functions.validMimeTypes, [arg0])
    }
}
