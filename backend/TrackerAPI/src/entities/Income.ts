import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users';
import { Account } from './Account';

@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, user => user.incomes)
    user?: User;

    @ManyToOne(() => Account, account => account.incomes)
    account?: Account;

    @Column({ length: 255 })
    description?: string;

    @Column("decimal", { precision: 10, scale: 2 })
    value?: number;

    @Column('date')
    date?: Date;

    constructor(
        id?: number,
        user?: User,
        account?: Account,
        description?: string,
        value?: number,
        date?: Date
      )
      {
        this.id = id,
        this.user = user,
        this.account = account,
        this.description = description,
        this.value = value,
        this.date = date
      }
}
export default Income