import { DataSource, In, Repository } from 'typeorm'
import AccountEntity from '../entities/Account'

class AccountRepository implements AccountRepository {
    private repository: Repository<AccountEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(AccountEntity)
    }

    async getAll(): Promise<AccountEntity[]> {
        return this.repository.find()
    }

    async getById(id: number): Promise<AccountEntity | undefined> {
        const account = await this.repository.findOneBy({ id })
        return account || undefined
    }
    
    
    async getBy(ids: number[]): Promise<AccountEntity[] | undefined> {
        const accounts = await this.repository.findBy({
            id: In(ids)
        })
        return accounts || undefined;
    }
    async getByUser(idUser: number): Promise<AccountEntity[]> {
        const accounts = await this.repository.find({
            where: { user: { id: idUser } },
            relations: ['user'] 
        });
        return accounts;
    }
    async create(account: Omit<AccountEntity, 'id'>): Promise<AccountEntity> {
        const newAccount = this.repository.create(account);
        return this.repository.save(newAccount);
    }

    async update(id: number, account: Partial<Omit<AccountEntity, 'id'>>): Promise<AccountEntity | undefined> {
        const accountToUpdate = await this.getById(id)

        if (!accountToUpdate) {
            return undefined
        }
        this.repository.merge(accountToUpdate, account);
        return await this.repository.save(accountToUpdate);    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default AccountRepository;