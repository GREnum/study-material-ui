import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { EntityBase } from "../../common/base.entity";


@Entity()
export class User extends EntityBase {

    @Column({ unique: true })
    public name: string;

    @Column()
    public password: string;

    @Column({ nullable: true })
    public stockId: string;

    @Column({ default: false })
    public isAdmin: boolean;

    @Column({ nullable: true })
    public currencyId: string;

}
