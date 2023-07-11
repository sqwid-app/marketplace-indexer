import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Position} from "./position.model"
import {Sale} from "./sale.model"

@Entity_()
export class Item {
    constructor(props?: Partial<Item>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    nftContract!: string

    @Index_()
    @Column_("int4", {nullable: false})
    tokenId!: number

    @Index_()
    @Column_("text", {nullable: false})
    creator!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    createdAt!: bigint

    @OneToMany_(() => Position, e => e.item)
    positions!: Position[]

    @OneToMany_(() => Sale, e => e.item)
    sales!: Sale[]
}
