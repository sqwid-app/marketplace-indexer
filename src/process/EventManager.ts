import { LogDescription, ethers } from "ethers";
import { Event, BlockHeader } from "@subsquid/substrate-processor";
import { AvailableBalanceDelta, BidData, DeletedPositionData, LoanFundedData, PositionData, RaffleEntryData, SaleData } from "../interfaces/interfaces";
import { Balance, Bid, Item, LoanFunded, Position, PositionState, RaffleEntry, Sale } from "../model";
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, ctx, Fields } from "../processor";
import * as SqwidMarketplace from "../abi/SqwidMarketplace";
import * as SqwidERC1155 from "../abi/SqwidERC1155";

export class EventManager {
    itemsCache: Item[] = [];
    positionsDataCache: Map<string, PositionData> = new Map();
    availableBalancesDelta: AvailableBalanceDelta[] = [];
    deletedPositionsDataCache: DeletedPositionData[] = [];
    salesDataCache: SaleData[] = [];
    bidsDataCache: BidData[] = [];
    loansFundedDataCache: LoanFundedData[] = [];
    raffleEntriesDataCache: RaffleEntryData[] = [];
    balancesCache: Map<string, Balance> = new Map();
    topics: Set<string> = new Set();

    // Process an event and add it to the cache
    async process(event: Event<Fields>): Promise<void> {
        // Map event-specific fields
        const eventData = event.args.address === MARKET_CONTRACT_ADDRESS.toLowerCase()
            ? SqwidMarketplace.abi.parseLog(event.args)
            : SqwidERC1155.abi.parseLog(event.args);
        if (!eventData) throw new Error(`Event data not found for event ${event.args.topics[0]}`)
        const topic0 = event.args.topics[0] || "";
        this.topics.add(topic0);
        
        switch (topic0) {
            case SqwidMarketplace.events.ItemCreated.topic:
                this.processItemCreatedEvent(eventData, event.block);
                break;
            case SqwidMarketplace.events.PositionUpdate.topic:
                this.processPositionUpdateEvent(eventData, event.block);
                break;
            case SqwidMarketplace.events.PositionDelete.topic:
                this.processPositionDeleteEvent(eventData, event.block);
                break;
            case SqwidMarketplace.events.MarketItemSold.topic:
                this.processMarketItemSoldEvent(eventData, event.id, event.block);
                break;
            case SqwidMarketplace.events.BidCreated.topic:
                this.processBidCreatedEvent(eventData, event.id, event.block);
                break;
            case SqwidMarketplace.events.LoanFunded.topic:
                this.processLoanFundedEvent(eventData, event.id, event.block);
                break;
            case SqwidMarketplace.events.RaffleEntered.topic:
                this.processRaffleEnteredEvent(eventData, event.id, event.block);
                break;
            case SqwidMarketplace.events.BalanceUpdated.topic:
                this.processBalanceUpdatedEvent(eventData);
                break;
            case SqwidERC1155.events.TransferSingle.topic:
                await this.processTransferSingleEvent(eventData);
                break;
            case SqwidERC1155.events.TransferBatch.topic:
                await this.processTransferBatchEvent(eventData);
                break;
        }
    }

    // Persist the cache to the database
    async save(): Promise<void> {
        // Save items
        await ctx.store.save(this.itemsCache);

        // Map and save positions
        const positions: Position[] = await Promise.all(Array.from(this.positionsDataCache.values())
            .map(async (positionData) => {
                let item = this.itemsCache.find((item) => item.id === positionData.itemId);
                if (!item) {
                    item = await ctx.store.get(Item, positionData.itemId);
                    if (!item) throw new Error(`Item ${positionData.itemId} not found`);
                }
                return new Position({
                    id: positionData.id,
                    item: item,
                    owner: positionData.owner,
                    amount: positionData.amount,
                    price: positionData.price,
                    marketFee: positionData.marketFee,
                    state: positionData.state,
                    updatedAt: positionData.updatedAt,
                });
            }
        ));
        await ctx.store.save(positions);

        // Update available balances
        const updatedAvailablePositions = await Promise.all(this.availableBalancesDelta.map(async (availableBalanceDelta) => {
            const position = await ctx.store.findOneBy(Position, {
                owner: availableBalanceDelta.owner, 
                item: { id: availableBalanceDelta.itemId },
                state: PositionState.Available,
            });
            if (!position) return null;
            position.amount += availableBalanceDelta.delta;
            return position;
        }));
        await ctx.store.save(updatedAvailablePositions.filter((position) => position !== null) as Position[]);

        // Update deleted positions
        await Promise.all(this.deletedPositionsDataCache.map(async (deletedPosition) => {
            const position = await ctx.store.get(Position, deletedPosition.id);
            if (!position) throw new Error(`Position ${deletedPosition.id} not found`);
            position.state = PositionState.Deleted;
            position.updatedAt = deletedPosition.updatedAt;
            await ctx.store.save(position);
        }));

        // Map and save sales
        const sales: Sale[] = await Promise.all(Array.from(this.salesDataCache.values())
            .map(async (saleData) => {
                let item = this.itemsCache.find((item) => item.id === saleData.itemId);
                if (!item) {
                    item = await ctx.store.get(Item, saleData.itemId);
                    if (!item) throw new Error(`Item ${saleData.itemId} not found`);
                }
                return new Sale({
                    id: saleData.id,
                    item: item,
                    seller: saleData.seller,
                    buyer: saleData.buyer,
                    price: saleData.price,
                    amount: saleData.amount,
                    timestamp: saleData.timestamp,
                    blockHeight: saleData.blockHeight,
                });
            }
        ));
        await ctx.store.save(sales);

        // Map and save bids
        const bids: Bid[] = await Promise.all(Array.from(this.bidsDataCache.values())
            .map(async (bidData) => {
                let position = positions.find((position) => position.id === bidData.positionId);
                if (!position) {
                    position = await ctx.store.get(Position, bidData.positionId);
                    if (!position) throw new Error(`Position ${bidData.positionId} not found`);
                }
                return new Bid({
                    id: bidData.id,
                    position: position,
                    bidder: bidData.bidder,
                    value: bidData.value,
                    timestamp: bidData.timestamp,
                    blockHeight: bidData.blockHeight,
                });
            }
        ));
        await ctx.store.save(bids);

        // Map and save loans funded
        const loansFunded: LoanFunded[] = await Promise.all(Array.from(this.loansFundedDataCache.values())
            .map(async (loanFundedData) => {
                let position = positions.find((position) => position.id === loanFundedData.positionId);
                if (!position) {
                    position = await ctx.store.get(Position, loanFundedData.positionId);
                    if (!position) throw new Error(`Position ${loanFundedData.positionId} not found`);
                }
                return new LoanFunded({
                    id: loanFundedData.id,
                    position: position,
                    funder: loanFundedData.funder,
                    timestamp: loanFundedData.timestamp,
                    blockHeight: loanFundedData.blockHeight,
                });
            }
        ));
        await ctx.store.save(loansFunded);

        // Map and save raffle entries
        const raffleEntries: RaffleEntry[] = await Promise.all(Array.from(this.raffleEntriesDataCache.values())
            .map(async (raffleEntryData) => {
                let position = positions.find((position) => position.id === raffleEntryData.positionId);
                if (!position) {
                    position = await ctx.store.get(Position, raffleEntryData.positionId);
                    if (!position) throw new Error(`Position ${raffleEntryData.positionId} not found`);
                }
                return new RaffleEntry({
                    id: raffleEntryData.id,
                    position: position,
                    user: raffleEntryData.user,
                    value: raffleEntryData.value,
                    timestamp: raffleEntryData.timestamp,
                    blockHeight: raffleEntryData.blockHeight,
                });
            }
        ));
        await ctx.store.save(raffleEntries);

        // Save balances
        await ctx.store.save(Array.from(this.balancesCache.values()));
    }

    private processItemCreatedEvent(eventData: LogDescription, blockHeader: BlockHeader<Fields>): void {
        const [itemId, nftContract, tokenId, creator] = eventData.args;
        const item = new Item({
            id: this.formatId(itemId),
            nftContract: nftContract,
            tokenId: tokenId.toNumber(),
            creator: creator,
            createdAt: BigInt(blockHeader.timestamp!),
        });

        this.itemsCache.push(item);
    }

    private processPositionUpdateEvent(eventData: LogDescription, blockHeader: BlockHeader<Fields>): void {
        const [positionId, itemId, owner, amount, price, marketFee, state] = eventData.args;

        const positionData: PositionData = {
            id: this.formatId(positionId),
            itemId: this.formatId(itemId),
            owner: owner,
            amount: amount.toNumber(),
            price: price.toString(),
            marketFee: marketFee.toString(),
            state: this.mapPositionState(state),
            updatedAt: BigInt(blockHeader.timestamp!),
        };

        this.positionsDataCache.set(positionData.id, positionData);

        // Update available balance delta
        if (positionData.state === PositionState.RegularSale 
            || positionData.state === PositionState.Auction 
            || positionData.state === PositionState.Raffle 
            || positionData.state === PositionState.Loan
        ) {
            this.addAvailableBalanceDelta(owner, this.formatId(itemId), -amount.toNumber());
        } else if (positionData.state === PositionState.Available) {
            const indexOfAvailableBalancesDelta = this.availableBalancesDelta.findIndex(
                (abd) => abd.owner === owner && abd.itemId === this.formatId(itemId)
            );
            if (indexOfAvailableBalancesDelta !== -1) {
                // Remove from available balances delta
                this.availableBalancesDelta.splice(indexOfAvailableBalancesDelta, 1);
            }
        }
    }

    private processPositionDeleteEvent(eventData: LogDescription, blockHeader: BlockHeader<Fields>): void {
        const [positionId] = eventData.args;

        const deletedPositionData: DeletedPositionData = {
            id: this.formatId(positionId),
            updatedAt: BigInt(blockHeader.timestamp!),
        };

        this.deletedPositionsDataCache.push(deletedPositionData);
    }

    private async processMarketItemSoldEvent(eventData: LogDescription, eventId: string, blockHeader: BlockHeader<Fields>): Promise<void> {
        const [itemId, , , seller, buyer, price, amount] = eventData.args;

        const saleData: SaleData = {
            id: eventId,
            itemId: this.formatId(itemId),
            seller: seller,
            buyer: buyer,
            price: price.div(amount).toString(),
            amount: amount.toNumber(),
            timestamp: BigInt(blockHeader.timestamp!),
            blockHeight: blockHeader.height,
        };

        this.salesDataCache.push(saleData);
    }

    private processBidCreatedEvent(eventData: LogDescription, eventId: string, blockHeader: BlockHeader<Fields>): void {
        const [positionId, bidder, value] = eventData.args;

        const bidData: BidData = {
            id: eventId,
            positionId: this.formatId(positionId),
            bidder: bidder,
            value: value.toString(),
            timestamp: BigInt(blockHeader.timestamp!),
            blockHeight: blockHeader.height,
        };

        this.bidsDataCache.push(bidData);
    }

    private processLoanFundedEvent(eventData: LogDescription, eventId: string, blockHeader: BlockHeader<Fields>): void {
        const [positionId, funder] = eventData.args;

        const loanFundedData: LoanFundedData = {
            id: eventId,
            positionId: this.formatId(positionId),
            funder: funder,
            timestamp: BigInt(blockHeader.timestamp!),
            blockHeight: blockHeader.height,
        };

        this.loansFundedDataCache.push(loanFundedData);
    }

    private processRaffleEnteredEvent(eventData: LogDescription, eventId: string, blockHeader: BlockHeader<Fields>): void {
        const [positionId, addr, value] = eventData.args;

        const raffleEntryData: RaffleEntryData = {
            id: eventId,
            positionId: this.formatId(positionId),
            user: addr,
            value: value.toString(),
            timestamp: BigInt(blockHeader.timestamp!),
            blockHeight: blockHeader.height,
        };

        this.raffleEntriesDataCache.push(raffleEntryData);
    }

    private processBalanceUpdatedEvent(eventData: LogDescription): void {
        const [addr, value] = eventData.args;

        const balance = new Balance({
            id: addr,
            balance: value.toString(),
        });

        this.balancesCache.set(balance.id, balance);
    }

    private async processTransferSingleEvent(eventData: LogDescription): Promise<void> {
        const [operator, from, to, id, value] = eventData.args;
        if (operator === MARKET_CONTRACT_ADDRESS 
            || to === MARKET_CONTRACT_ADDRESS
            || from === ethers.ZeroAddress) return;

        // Find item in cache
        let item = this.itemsCache.find((item) => item.tokenId === Number(id));
        if (!item) {
            // Find item in database
            item = await ctx.store.findOneBy(Item, {
                nftContract: NFT_CONTRACT_ADDRESS,
                tokenId: Number(id),
            });
            if (!item) return; // NFT is not in the marketplace
        }

        this.addAvailableBalanceDelta(from, item.id, -Number(value));
        if (to !== ethers.ZeroAddress) {
            this.addAvailableBalanceDelta(to, item.id, Number(value));
        }
    }

    private async processTransferBatchEvent(eventData: LogDescription): Promise<void> {
        const [operator, from, to, ids, values] = eventData.args;
        if (operator === MARKET_CONTRACT_ADDRESS 
            || to === MARKET_CONTRACT_ADDRESS
            || from === ethers.ZeroAddress) return;

        for (const [index, tokenId] of ids) {
            // Find item in cache
            let item = this.itemsCache.find((item) => item.tokenId === Number(tokenId));
            if (!item) {
                // Find item in database
                item = await ctx.store.findOneBy(Item, {
                    nftContract: NFT_CONTRACT_ADDRESS,
                    tokenId: Number(tokenId),
                });
                if (!item) continue; // NFT is not in the marketplace
            }
    
            this.addAvailableBalanceDelta(from, item.id, -Number(values[index]));
            if (to !== ethers.ZeroAddress) {
                this.addAvailableBalanceDelta(to, item.id, Number(values[index]));
            }
        }
    }

    private addAvailableBalanceDelta(owner: string, itemId: string, amount: number): void {
        const indexOfAvailableBalancesDelta = this.availableBalancesDelta.findIndex(
            (abd) => abd.owner === owner && abd.itemId === this.formatId(itemId)
        );
        const availablePosition = Array.from(this.positionsDataCache.values()).find(
            (positionData) => positionData.owner === owner 
                && positionData.state === PositionState.Available 
                && positionData.itemId === itemId
        );
        if (availablePosition) { // Available position is in cache
            // Update available position balance
            this.positionsDataCache.get(availablePosition.id)!.amount += amount;
            // Remove from available balances delta
            if (indexOfAvailableBalancesDelta !== -1) {
                this.availableBalancesDelta.splice(indexOfAvailableBalancesDelta, 1);
            }
        } else { // Available position is not in cache
            if (indexOfAvailableBalancesDelta !== -1) {
                // Update available balance delta
                this.availableBalancesDelta[indexOfAvailableBalancesDelta].delta += amount;
            } else {
                // Create available balance delta
                this.availableBalancesDelta.push({
                    itemId: this.formatId(itemId),
                    owner: owner,
                    delta: amount
                });
            }
        }
    }

    private mapPositionState(state: any): PositionState {
        switch (Number(state)) {
            case 0:
                return PositionState.Available;
            case 1:
                return PositionState.RegularSale;
            case 2:
                return PositionState.Auction;
            case 3:
                return PositionState.Raffle;
            case 4:
                return PositionState.Loan;
            default:
                throw new Error(`Invalid position state ${state}`);
        }
    }

    private formatId(value: any): string {
        return value.toString().padStart(9, "0");
    }
}