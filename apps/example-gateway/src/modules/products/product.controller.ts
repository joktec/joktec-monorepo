import { BaseController, Controller } from '@joktec/core';
import { ProductService } from './product.service';
import { Product } from './models';

@Controller('products')
export class ProductController extends BaseController<Product, string>({ dto: Product, useGuard: false }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
