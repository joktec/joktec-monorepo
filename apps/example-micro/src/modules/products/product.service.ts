import { BaseService, Injectable } from '@joktec/core';
import { Product } from '../../models';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService extends BaseService<Product, string> {
  constructor(protected productRepo: ProductRepo) {
    super(productRepo);
  }
}
