import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Item} from "./item.model"
import {PositionState} from "./_positionState"
import {Bid} from "./bid.model"
import {RaffleEntry} from "./raffleEntry.model"
import {LoanFunded} from "./loanFunded.model"

@Entity_()
export class Position {
    constructor(props?: Partial<Position>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Item, {nullable: true})
    item!: Item

    @Index_()
    @Column_("text", {nullable: false})
    owner!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    marketFee!: bigint

    @Column_("varchar", {length: 11, nullable: true})
    state!: PositionState | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    updatedAt!: bigint

    @OneToMany_(() => Bid, e => e.position)
    bids!: Bid[]

    @OneToMany_(() => RaffleEntry, e => e.position)
    raffleEntries!: RaffleEntry[]

    @OneToMany_(() => LoanFunded, e => e.position)
    loansFunded!: LoanFunded[]
}
