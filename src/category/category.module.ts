import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from 'src/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity]),AuthModule],
  controllers:[CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
