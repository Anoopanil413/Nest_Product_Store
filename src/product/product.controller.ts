import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { Product } from './product.schema';
import { CreateProductDTO } from './dtos/create-product.dtos';

@Controller('store/products')
export class ProductController {
    constructor(private ProductService:ProductService){}
    @Get('/')
    async getAllProductas(){
        const products = await this.ProductService.findAll()
        if (!products) throw new NotFoundException('Product does not exist!');
        return products

    }
    @Get('filtered')
    async getFilteredProducts(@Query() filterProductDTO: FilterProductDTO): Promise<Product[]> {
      return this.ProductService.getFilteredProducts(filterProductDTO);
    }
    @Post('add')
    async addProducts(@Body() createProductDTO: CreateProductDTO): Promise<Product[]>{
        const products =await this.ProductService.addProduct(createProductDTO)
        if (!products) throw new NotFoundException('Product not added!');
        return products

    }
}
