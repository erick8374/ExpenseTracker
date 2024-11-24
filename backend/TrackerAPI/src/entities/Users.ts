import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Account } from "./Account";
import { Category } from "./Category";
import { Transaction } from "./Transaction";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "varchar", unique: true })
  email?: string;

  @Column({ type: "varchar" })
  password?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Account, (account) => account.user)
  accounts?: Account[];

  @OneToMany(() => Category, (category) => category.user)
  categories?: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions?: Transaction[];


constructor(
  id?: number,
  name?: string,
  email?: string,
  password?: string,
  created_at?: Date,
  updated_at?: Date,
  accounts?: Account[],
  categories?: Category[],
  transactions?: Transaction[]
)
{
  this.id = id
  this.name = name
  this.email = email
  this.password = password
  this.created_at = created_at
  this.updated_at = updated_at
  this.accounts = accounts
  this.categories = categories
  this.transactions = transactions
}
}
export default User