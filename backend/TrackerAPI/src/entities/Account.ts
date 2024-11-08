import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './Users';
import { Expense } from './Expense';
import { Income } from './Income';
@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, user => user.accounts)
    user?: User;

    @Column({ length: 100 })
    name?: string;

    @Column("decimal", { precision: 10, scale: 2, default: 0 })
    initial_income?: number;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => Expense, expense => expense.account)
    expenses?: Expense[];

    @OneToMany(() => Income, income => income.account)
    incomes?: Income[];

    constructor(
        id?: number,
        user?: User,
        name?: string,
        initial_income?: number,
        description?: string,
        expenses?: [],
        incomes?: []
    
      ){
        this.id = id,
        this.user = user,
        this.name = name,
        this.initial_income = initial_income,
        this.description = description,
        this.expenses = expenses,
        this.incomes = incomes
      }

}

export default Account