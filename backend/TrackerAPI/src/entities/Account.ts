import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./Users";
import { Transaction } from "./Transaction";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "float" })
  balance?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: "CASCADE" })
  user?: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions?: Transaction[];
  
  constructor(
    id?: number,
    name?: string,
    balance?: number,
    created_at?:Date,
    updated_at?:Date,
    user?: User,
    transactions?: Transaction[]
  ){
      this.id = id,
      this.name = name,
      this.balance = balance,
      this.created_at = created_at,
      this.updated_at = updated_at,
      this.user = user,
      this.transactions = transactions
    }
    
}


export default Account