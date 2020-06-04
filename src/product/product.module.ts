import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity]),
    MulterModule.register({
        dest:'./tmp/files'
    })
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule {



}
