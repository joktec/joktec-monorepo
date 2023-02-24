import { BaseService } from '@joktec/core';
import { Product } from './product';
import { ProductRepo } from './product.repo';

export class ProductService extends BaseService<Product, string> {
  constructor(protected productRepo: ProductRepo) {
    super(productRepo);
  }
}
