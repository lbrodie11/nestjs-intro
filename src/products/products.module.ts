import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsController } from './products.controller'
import { ProductsService } from "./products.service";
import { ProductSchema } from "./schemas/products.schema";
import { ProductsResolver } from './products.resolver'

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsResolver]
})
export class ProductsModule{}