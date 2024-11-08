import { DataSource, In, Repository } from 'typeorm'
import ExpenseEntity from '../entities/Expense'

class ExpenseRepository implements ExpenseRepository {
    private repository: Repository<ExpenseEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(ExpenseEntity)
    }


    async getAll(): Promise<ExpenseEntity[]> {
        return this.repository.find({
            relations: ['user', 'category'], // Carregar as relações necessárias
        });
    }
    async getById(id: number): Promise<ExpenseEntity | undefined> {
        const expense = await this.repository.findOneBy({ id })
        return expense || undefined
    }
    
    
    async getBy(ids: number[]): Promise<ExpenseEntity[] | undefined> {
        const expenses = await this.repository.findBy({
            id: In(ids)
        })
        return expenses || undefined;
    }

    async getByUser(idUser: number): Promise<ExpenseEntity[]> {
        const expenses = await this.repository.find({
            where: { user: { id: idUser } },
            relations: ['user']
        });
        return expenses;
    }
    async getByCategory(idCategory: number): Promise<ExpenseEntity[]> {
        const expenses = await this.repository.find({
            where: { category: { id: idCategory } },
            relations: ['category']
        });
        return expenses;
    }
    async create(expense: Omit<ExpenseEntity, 'id'>): Promise<ExpenseEntity> {
        const newExpense= this.repository.create(expense);
        return this.repository.save(newExpense);
    }

    async update(id: number, expense: Partial<Omit<ExpenseEntity, 'id'>>): Promise<ExpenseEntity | undefined> {
        const expenseToUpdate = await this.getById(id)

        if (!expenseToUpdate) {
            return undefined
        }
        this.repository.merge(expenseToUpdate, expense);
        return await this.repository.save(expenseToUpdate);    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default ExpenseRepository;