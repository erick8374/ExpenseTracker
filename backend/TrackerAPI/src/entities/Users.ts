import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './Expense';
import { Account } from './Account';
import { Income } from './Income';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  senha?: string;

  @OneToMany(() => Expense, expense => expense.user)
  expenses?: Expense[];

  @OneToMany(() => Account, account => account.user)
  accounts?: Account[];

  @OneToMany(() => Income, income => income.user)
  incomes?: Income[];

constructor(
  id?: number,
  name?: string,
  email?: string,
  senha?: string,
  expenses?:[],
  accounts?: [],
  incomes?:[]
)
{
  this.id = id
  this.name = name
  this.email = email
  this.senha = senha,
  this.expenses = expenses,
  this.accounts = accounts
  this.incomes = incomes
}
}
export default User