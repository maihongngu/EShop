import { Controller, Get, Param, NotFoundException, Post, Body, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/:productName')
  async findProduct(@Param('productName') productName: string) {
    const product = await this.productService.findByProduct(productName);

    if (!product) {
      throw new NotFoundException('Invalid Product');
    }
    return { product: product };
  }

  @Get()
  async findAllProducts() {
    const listProducts = await this.productService.findAllProduct();

    if (!listProducts) {
      throw new NotFoundException('Load product list failed');
    }
    if (listProducts.length === 0) {
      return { load: { status: 'List is empty' } };
    }

    return { productList: { listProducts } };
  }

  @Post('/')
  async createProduct(@Body() ProductEntity: ProductEntity){

    return this.productService.createProduct(ProductEntity)

  }


  @Delete('/:id')
  async deleteProduct(@Param() id){
    return this.productService.deleteProduct(id)
  }
  
}
