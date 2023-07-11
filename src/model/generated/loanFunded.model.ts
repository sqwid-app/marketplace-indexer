import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Position} from "./position.model"

@Entity_()
export class LoanFunded {
    constructor(props?: Partial<LoanFunded>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Position, {nullable: true})
    position!: Position

    @Index_()
    @Column_("text", {nullable: false})
    funder!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint
}
