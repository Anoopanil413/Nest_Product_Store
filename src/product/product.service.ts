import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { FilterProductDTO } from './dtos/filter-product.dto';
import { CreateProductDTO } from './dtos/create-product.dtos';

@Injectable()
export class ProductService {
    private readonly  dummyProducts:Product[] = [
        {
          name: 'Product 1',
          price: 19.99,
          category: 'Electronics',
        },
        {
          name: 'Product 2',
          price: 29.99,
          category: 'Clothing',
        },
        {
          name: 'Product 3',
          price: 9.99,
          category: 'Books',
        },
      ];
    constructor(@InjectModel('Product') private readonly ProductModel:Model<ProductDocument>){}

    async findAll(): Promise<Product[]> {
        return this.dummyProducts;
      }
    async getFilteredProducts(filterProductDTO: FilterProductDTO):Promise<Product[]>{
        const { category, search } = filterProductDTO;
        let products  = []
        
    if (search) {
        products = this.dummyProducts.filter(product => 
          product.name.includes(search));
      }
  
      if (category) {
        products = this.dummyProducts.filter(product =>{
            console.log(product.category === category,product.category,typeof(product.category),product.category , typeof(category))
             return product.category == category})
      }
  
      return products;

    }
    async addProduct(createProductDTO: CreateProductDTO): Promise<Product[]> {
        this.dummyProducts.push(createProductDTO);
        return this.dummyProducts
      }
    
    }
