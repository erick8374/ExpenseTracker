import { DataSource, In, Repository } from 'typeorm'
import CategoryEntity from '../entities/Category'

class CategoryRepository implements CategoryRepository {
    private repository: Repository<CategoryEntity>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(CategoryEntity)
    }

    async getAll(): Promise<CategoryEntity[]| undefined> {
        try{
        const categories = await this.repository.find()
        return categories}
        catch(error){
            return undefined
        }
    }

    async getById(id: number): Promise<CategoryEntity | undefined> {
        try{        
            const category = await this.repository.findOneBy({ id })
            return category || undefined
        }catch(error){
            return undefined
        }
    }
    
    
    async getBy(ids: number[]): Promise<CategoryEntity[] | undefined> {
        const categories = await this.repository.findBy({
            id: In(ids)
        })
        return categories || undefined;
    }

    async getByType(type: string): Promise<CategoryEntity[] | undefined> {
        const categories = await this.repository.findBy({
          type: In([type]),
        });
        return categories || undefined;
    }

    async create(category: Omit<CategoryEntity, 'id'>): Promise<CategoryEntity|undefined> {
        try{
            const newCategory = this.repository.create(category);
            return this.repository.save(newCategory);
        }catch(error){
            return undefined
        }
    }

    async update(id: number, category: Partial<Omit<CategoryEntity, 'id'>>): Promise<CategoryEntity | undefined> {
        try{
            const categoryToUpdate = await this.getById(id)
            if (!categoryToUpdate) {
                return undefined
            }
            this.repository.merge(categoryToUpdate, category);
            return await this.repository.save(categoryToUpdate); 
        }catch(error){
            return undefined
        }
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}

export default CategoryRepository;