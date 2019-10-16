import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ProductsModule, 
    MongooseModule.forRoot('mongodb+srv://brodie:pboevKMrwT67Wvr4@cluster0-k2jo8.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
