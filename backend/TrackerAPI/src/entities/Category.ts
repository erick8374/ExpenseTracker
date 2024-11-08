import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './Expense';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Expense, expense => expense.category)
  expenses: Expense[];

  constructor(
    id:number,
    name:string,
    expenses:[]
  ){
    this.id = id,
    this.name = name,
    this.expenses = expenses
  }
}
export default Category