import { Controller, Get, Post, Body, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from 'src/entities/category.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Get('/')
    async findAllCategories(){ 

        const listCategories = await this.categoryService.findAllCategories()
        return {categoryList: {listCategories}}
    }

    @Post('/')
    @UseGuards(AuthGuard())
    async createCategory(@Body() CategoryEntity: CategoryEntity){

        return this.categoryService.createCategories(CategoryEntity)

    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteCategory(@Param() id){
        return this.categoryService.deleteCategory(id)
    }

    @Put()
    async updateCategory(@Body() CategoryEntity: CategoryEntity){

        return this.categoryService.updateCategory(CategoryEntity)

    }


}
