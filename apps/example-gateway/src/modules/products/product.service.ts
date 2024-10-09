import { BaseService, Injectable } from '@joktec/core';
import { Product } from '../../models/entities';
import { ProductRepo } from '../../repositories';

@Injectable()
export class ProductService extends BaseService<Product, string> {
  constructor(protected productRepo: ProductRepo) {
    super(productRepo);
  }
}
