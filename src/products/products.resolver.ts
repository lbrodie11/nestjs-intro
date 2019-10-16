import { Resolver, Query, ResolveProperty, Args, Parent } from "@nestjs/graphql";
import { Product } from './dto/products.dto'
import { ProductsService } from "./products.service";

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  // @Query()
  // async author(@Args('id') id: number) {
  //   return await this.authorsService.findOneById(id);
  // }

  @Query(() => String)
  async hello() {
    return 'hello'
  }

  @Query(() => [Product])
  async products() {
    return this.productsService.getProducts();
  }
}