import { QualifiedName } from "@subsquid/substrate-processor"
import { PositionState } from "../model"

export interface SubstrateExtrinsicSignature {
    address: any
    signature: any
    signedExtensions: any
}

export interface ExtrinsicRaw {
    id: string
    indexInBlock: number
    signature: SubstrateExtrinsicSignature
    version: number
    success: boolean
    hash: string
    pos: number
    error?: any
}

export interface EventRaw {
    id: string
    name: QualifiedName
    args: RawEventData
    pos: number
    extrinsic?: ExtrinsicRaw
}

export interface RawEventData {
    address: string,
    topics:string[],
    data: string,
}

export interface PositionData {
    id: string;
    itemId: string;
    owner: string;
    amount: number;
    price: bigint;
    marketFee: bigint;
    state: PositionState;
    updatedAt: bigint;
}

export interface DeletedPositionData {
    id: string;
    updatedAt: bigint;
}

export interface SaleData {
    id: string;
    itemId: string;
    seller: string;
    buyer: string;
    price: bigint;
    amount: number;
    timestamp: bigint;
    blockHeight: number;
}

export interface BidData {
    id: string;
    positionId: string;
    bidder: string;
    value: bigint;
    timestamp: bigint;
    blockHeight: number;
}

export interface LoanFundedData {
    id: string;
    positionId: string;
    funder: string;
    timestamp: bigint;
    blockHeight: number;
}

export interface RaffleEntryData {
    id: string;
    positionId: string;
    user: string;
    value: bigint;
    timestamp: bigint;
    blockHeight: number;
}