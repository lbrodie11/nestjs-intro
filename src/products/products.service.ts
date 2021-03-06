import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

import { Product } from './interfaces/products.interface'

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({title, description: desc, price} )
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts(){
    const products = await this.productModel.find().exec()
    return products.map((prod) => ({
      id: prod.id, title: prod.title, description: prod.description, price: prod.price
    }));
  }

  async getSingleProduct(prodId: string){
    const product =  await this.findProduct(prodId);
    return {id: product.id, title: product.title, description: product.description, price: product.price};
  }

  async updateProduct(prodId: string, title: string, desc: string, price: number){
    const updatedProduct = await this.findProduct(prodId)
    if(title){
      updatedProduct.title = title
    } 
    if(desc){
      updatedProduct.description = desc
    }
    if(price){
      updatedProduct.price = price
    }
    updatedProduct.save()
  }

  async deleteProduct(prodId: string){
    const result = await this.productModel.deleteOne({
      _id: prodId
    }).exec();
    if(result.n === 0){
      throw new NotFoundException('Could not find Product')
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try{
      product = await this.productModel.findById(id).exec();
    }catch(error){
      throw new NotFoundException('Could not find Product')
    }
    if(!product){
      throw new NotFoundException('Could not find Product')
    }
    return product;
  }
}