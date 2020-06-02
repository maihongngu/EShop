import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
    
    ){}


    async findByProduct(product_name: string): Promise<ProductEntity>{

        return await this.productRepo.findOne({where: {product_name}, relations:['imgPaths','category']})

    }

    async findAllProduct(): Promise<ProductEntity[]>{
        return await this.productRepo.find({relations:['imgPaths','category']})
    }

    async createProduct(ProductEntity: ProductEntity): Promise<ProductEntity> {

        const product = await this.productRepo.create(ProductEntity)
        product.save()
        return product
    }

    async deleteProduct(id){
        return await this.productRepo.delete(id)
    }


}
