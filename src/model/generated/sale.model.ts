import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Item} from "./item.model"

@Entity_()
export class Sale {
    constructor(props?: Partial<Sale>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Item, {nullable: true})
    item!: Item

    @Index_()
    @Column_("text", {nullable: false})
    seller!: string

    @Index_()
    @Column_("text", {nullable: false})
    buyer!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("int4", {nullable: false})
    amount!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint

    @Index_()
    @Column_("int4", {nullable: false})
    blockHeight!: number
}
