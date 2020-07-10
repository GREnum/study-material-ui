import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { EntityBase } from "../../common/base.entity";


@Entity()
export class Setting extends EntityBase {

    @Column({ unique: true })
    public code: string;

    @Column({ nullable: true })
    public value: string;

}
