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

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "enum", enum: ["income", "expense"] })
  type?: "income" | "expense";

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.categories, { onDelete: "CASCADE" })
  user?: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];


  constructor(
    id:number,
    name:string,
    type: "income" | "expense",
    created_at?: Date,
    updated_at?: Date,
    user?: User,
    transactions?: Transaction[]

  ){
    this.id = id,
    this.name = name,
    this.type = type,
    this.created_at = created_at,
    this.updated_at = updated_at,
    this.user = user,
    this.transactions = transactions
  }
}
export default Category