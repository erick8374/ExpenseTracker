import { DataSource, In, Repository } from 'typeorm'
import TransactionEntity from '../entities/Transaction'

class TransactionRepository implements TransactionRepository {
    private repository: Repository<TransactionEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(TransactionEntity)
    }

    async getAll(): Promise<TransactionEntity[] | undefined> {
        try{
            const transactions =  await this.repository.find({
                relations: ['user', 'category']
            });
            return transactions
        }catch(error){
            return undefined
        }
    }

    async getById(id: number): Promise<TransactionEntity | undefined> {
        const transaction = await this.repository.findOneBy({ id })
        return transaction || undefined
    }
    
    async getBy(ids: number[]): Promise<TransactionEntity[] | undefined> {
        const transactions = await this.repository.findBy({
            id: In(ids)
        })
        return transactions || undefined;
    }

    async getByUser(idUser: number): Promise<TransactionEntity[] > {
        const transactions = await this.repository.find({
            where: { user: { id: idUser } },
            relations: ['user','account']
        });
        return transactions || undefined;
    }

    async getByCategory(idCategory: number): Promise<TransactionEntity[] | undefined> {
        const transactions = await this.repository.find({
            where: { category: { id: idCategory } },
            relations: ['category','account']
        });
        return transactions || undefined;
    }

    async getByType(type: string): Promise<TransactionEntity[] | undefined> {
        const categories = await this.repository.find({
          where: {type: In([type])},
          relations: ['category','account']

        });
        return categories || undefined;
    }

    async create(transaction: Omit<TransactionEntity, 'id'>): Promise<TransactionEntity|undefined> {
        try{
            const newTransaction= this.repository.create(transaction);
            return this.repository.save(newTransaction);
        }catch(error){
            return undefined
        }
    }

    async update(id: number, transaction: Partial<Omit<TransactionEntity, 'id'>>): Promise<TransactionEntity | undefined> {
        try{
            const transactionToUpdate = await this.getById(id)
            if (!transactionToUpdate) {
                return undefined
            }
            this.repository.merge(transactionToUpdate, transaction);
            return await this.repository.save(transactionToUpdate);
        }catch(error){
            return undefined
        }   
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default TransactionRepository;