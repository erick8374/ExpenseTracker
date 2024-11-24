import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./Users";
import { Account } from "./Account";
import { Category } from "./Category";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "enum", enum: ["income", "expense"] })
  type?: "income" | "expense";

  @Column({ type: "float" })
  amount?: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "date" })
  date?: Date;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: "CASCADE" })
  user?: User;

  @ManyToOne(() => Account, (account) => account.transactions, { onDelete: "CASCADE" })
  account?: Account;

  @ManyToOne(() => Category, (category) => category.transactions, { onDelete: "CASCADE" })
  category?: Category;

  constructor(
    id?:number,
    type?: "income" | "expense",
    amount?: number,
    description?: string,
    date?: Date,
    created_at?: Date,
    updated_at?: Date,
    user?: User,
    account?: Account,
    category?: Category
  ){
    this.id = id,
    this.type = type,
    this.amount = amount,
    this.description = description,
    this.date = date,
    this.created_at = created_at,
    this.updated_at = updated_at,
    this.user = user,
    this.account = account,
    this.category = category
  }
}

export default Transaction