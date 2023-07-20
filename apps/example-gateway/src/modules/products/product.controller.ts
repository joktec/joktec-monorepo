import { BaseController, Controller } from '@joktec/core';
import { Product } from './models';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController extends BaseController<Product, string>({ dto: Product, useBearer: false }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
