import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) private categoryRepo: Repository<CategoryEntity>){}


    async findAllCategories(): Promise<CategoryEntity[]>{
        return await this.categoryRepo.find()
    }


    
    async createCategories(CategoryEntity: CategoryEntity): Promise<CategoryEntity>{
        return await this.categoryRepo.save(CategoryEntity)
    }    

    async deleteCategory(id): Promise<DeleteResult> {
        return await this.categoryRepo.delete(id)
    }

    async updateCategory(CategoryEntity: CategoryEntity): Promise<UpdateResult>{

        return await this.categoryRepo.update(CategoryEntity.id, CategoryEntity)

    }

}
