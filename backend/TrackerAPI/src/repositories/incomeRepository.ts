import { DataSource, In, Repository } from 'typeorm'
import IncomeEntity from '../entities/Income'

class IncomeRepository implements IncomeRepository {
    private repository: Repository<IncomeEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(IncomeEntity)
    }

    async getAll(): Promise<IncomeEntity[]> {
        return this.repository.find({
            relations: ['user', 'account'], // Carregar as relações necessárias
        });
    }

    async getById(id: number): Promise<IncomeEntity | undefined> {
        const income = await this.repository.findOneBy({ id })
        return income || undefined
    }
    
    
    async getBy(ids: number[]): Promise<IncomeEntity[] | undefined> {
        const incomes = await this.repository.findBy({
            id: In(ids)
        })
        return incomes || undefined;
    }

    async getByUser(idUser: number): Promise<IncomeEntity[]> {
        const incomes = await this.repository.find({
            where: { user: { id: idUser } },
            relations: ['user']
        });
        return incomes;
    }

    async create(income: Omit<IncomeEntity, 'id'>): Promise<IncomeEntity> {
        const newIncome = this.repository.create(income);
        return this.repository.save(newIncome);
    }

    async update(id: number, income: Partial<Omit<IncomeEntity, 'id'>>): Promise<IncomeEntity | undefined> {
        const incomeToUpdate = await this.getById(id)

        if (!incomeToUpdate) {
            return undefined
        }
        this.repository.merge(incomeToUpdate, income);
        return await this.repository.save(incomeToUpdate);    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default IncomeRepository;