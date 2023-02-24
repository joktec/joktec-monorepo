import { Module } from '@joktec/core';
import { ProductController } from './product.controller';
import { ProductRepo } from './product.repo';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductRepo, ProductService],
  exports: [],
})
export class ProductModule {}
