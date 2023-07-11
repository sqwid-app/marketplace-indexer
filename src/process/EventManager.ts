import { BidData, DeletedPositionData, EventRaw, LoanFundedData, PositionData, RaffleEntryData, SaleData } from "../interfaces/interfaces";
import * as SqwidMarketplace from "../abi/SqwidMarketplace";
import { Balance, Bid, Item, LoanFunded, Position, PositionState, RaffleEntry, Sale } from "../model";
import { LogDescription } from "@ethersproject/abi";
import { ctx } from "../processor";
import { SubstrateBlock } from "@subsquid/substrate-processor";

export class EventManager {
    itemsCache: Item[] = [];
    positionsDataCache: Map<string, PositionData> = new Map();
    deletedPositionsDataCache: DeletedPositionData[] = [];
    salesDataCache: SaleData[] = [];
    bidsDataCache: BidData[] = [];
    loansFundedDataCache: LoanFundedData[] = [];
    raffleEntriesDataCache: RaffleEntryData[] = [];
    balancesCache: Map<string, Balance> = new Map();

    // Process an event and add it to the cache
    async process(eventRaw: EventRaw, blockHeader: SubstrateBlock): Promise<void> {
        // Map event-specific fields
        const eventData = SqwidMarketplace.abi.parseLog(eventRaw.args);
        const topic0 = eventRaw.args.topics[0] || "";
        const timestamp = BigInt(blockHeader.timestamp);
        switch (topic0) {
            case SqwidMarketplace.events.ItemCreated.topic:
                this.processItemCreatedEvent(eventData, timestamp);
                break;
            case SqwidMarketplace.events.PositionUpdate.topic:
                this.processPositionUpdateEvent(eventData, timestamp);
                break;
            case SqwidMarketplace.events.PositionDelete.topic:
                this.processPositionDeleteEvent(eventData, timestamp);
                break;
            case SqwidMarketplace.events.MarketItemSold.topic:
                this.processMarketItemSoldEvent(eventData, eventRaw.id, timestamp);
                break;
            case SqwidMarketplace.events.BidCreated.topic:
                this.processBidCreatedEvent(eventData, eventRaw.id, timestamp);
                break;
            case SqwidMarketplace.events.LoanFunded.topic:
                this.processLoanFundedEvent(eventData, eventRaw.id, timestamp);
                break;
            case SqwidMarketplace.events.RaffleEntered.topic:
                this.processRaffleEnteredEvent(eventData, eventRaw.id, timestamp);
                break;
            case SqwidMarketplace.events.BalanceUpdated.topic:
                this.processBalanceUpdatedEvent(eventData);
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
            .map(async (SaleData) => {
                let item = this.itemsCache.find((item) => item.id === SaleData.itemId);
                if (!item) {
                    item = await ctx.store.get(Item, SaleData.itemId);
                    if (!item) throw new Error(`Item ${SaleData.itemId} not found`);
                }
                return new Sale({
                    id: SaleData.id,
                    item: item,
                    seller: SaleData.seller,
                    buyer: SaleData.buyer,
                    price: SaleData.price,
                    amount: SaleData.amount,
                    timestamp: SaleData.timestamp,
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
                });
            }
        ));
        await ctx.store.save(raffleEntries);

        // Save balances
        await ctx.store.save(Array.from(this.balancesCache.values()));
    }

    private processItemCreatedEvent(eventData: LogDescription, timestamp: bigint): void {
        const [itemId, nftContract, tokenId, creator] = eventData.args;
        const item = new Item({
            id: this.formatId(itemId),
            nftContract: nftContract,
            tokenId: tokenId.toNumber(),
            creator: creator,
            createdAt: timestamp,
        });

        this.itemsCache.push(item);
    }

    private processPositionUpdateEvent(eventData: LogDescription, timestamp: bigint): void {
        const [positionId, itemId, owner, amount, price, marketFee, state] = eventData.args;

        const positionData: PositionData = {
            id: this.formatId(positionId),
            itemId: this.formatId(itemId),
            owner: owner,
            amount: amount.toNumber(),
            price: price.toString(),
            marketFee: marketFee.toString(),
            state: this.mapPositionState(state),
            updatedAt: timestamp,
        };

        this.positionsDataCache.set(positionData.id, positionData);
    }

    private processPositionDeleteEvent(eventData: LogDescription, timestamp: bigint): void {
        const [positionId] = eventData.args;

        const deletedPositionData: DeletedPositionData = {
            id: this.formatId(positionId),
            updatedAt: timestamp,
        };

        this.deletedPositionsDataCache.push(deletedPositionData);
    }

    private async processMarketItemSoldEvent(eventData: LogDescription, eventId: string, timestamp: bigint): Promise<void> {
        const [itemId, , , seller, buyer, price, amount] = eventData.args;

        const SaleData: SaleData = {
            id: eventId,
            itemId: this.formatId(itemId),
            seller: seller,
            buyer: buyer,
            price: price.toString(),
            amount: amount.toNumber(),
            timestamp: timestamp,
        };

        this.salesDataCache.push(SaleData);
    }

    private processBidCreatedEvent(eventData: LogDescription, eventId: string, timestamp: bigint): void {
        const [positionId, bidder, value] = eventData.args;

        const bidData: BidData = {
            id: eventId,
            positionId: this.formatId(positionId),
            bidder: bidder,
            value: value.toString(),
            timestamp: timestamp,
        };

        this.bidsDataCache.push(bidData);
    }

    private processLoanFundedEvent(eventData: LogDescription, eventId: string, timestamp: bigint): void {
        const [positionId, funder] = eventData.args;

        const loanFundedData: LoanFundedData = {
            id: eventId,
            positionId: this.formatId(positionId),
            funder: funder,
            timestamp: timestamp,
        };

        this.loansFundedDataCache.push(loanFundedData);
    }

    private processRaffleEnteredEvent(eventData: LogDescription, eventId: string, timestamp: bigint): void {
        const [positionId, addr, value] = eventData.args;

        const raffleEntryData: RaffleEntryData = {
            id: eventId,
            positionId: this.formatId(positionId),
            user: addr,
            value: value.toString(),
            timestamp: timestamp,
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