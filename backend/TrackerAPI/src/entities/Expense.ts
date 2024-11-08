import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './Users';
import { Category } from './Category';
import { Account } from './Account';
@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  description?: string;

  @Column('decimal')
  value?: number;

  @ManyToOne(() => User, user => user.expenses)
  user?: User;

  @ManyToOne(() => Category, category => category.expenses)
  category?: Category;

  @ManyToOne(() => Account, account => account.expenses)
  account?: Account;

  @Column('date')
  date?: Date;

  constructor(
    id?:number,
    description?:string,
    value?:number,
    user?:User,
    category?:Category,
    account?: Account,
    date?: Date

  ){
    this.id = id,
    this.description = description,
    this.value = value,
    this.user = user,
    this.category = category,
    this.account = account
    this.date = date
  }
}


export default Expense