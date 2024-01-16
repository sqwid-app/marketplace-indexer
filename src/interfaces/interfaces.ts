import { PositionState } from "../model"

export interface PositionData {
    id: string;
    itemId: string;
    owner: string;
    amount: bigint;
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
    amount: bigint;
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

export interface AvailableBalanceDelta {
    itemId: string;
    owner: string;
    delta: bigint;
}