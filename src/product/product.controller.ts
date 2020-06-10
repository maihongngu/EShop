import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from 'src/entities/product.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {diskStorage}from 'multer'
import {extname} from 'path'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
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
  
  @Post()
  @UseInterceptors(FilesInterceptor('files', 20 ,{
    storage: diskStorage({
      destination: './tmp/files'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async createProduct(@UploadedFiles() files, @Body() ProductEntity: ProductEntity) {
    const response = [];
      files.forEach(file => {
        const fileReponse = {
          url: file.filename,
        };
        response.push(fileReponse);
      });
      ProductEntity.imgPaths = response
      console.log(ProductEntity)
      return this.productService.createProduct(ProductEntity);
  }

  @Delete('/:id')
  async deleteProduct(@Param() id) {
    return this.productService.deleteProduct(id);
  }
}
