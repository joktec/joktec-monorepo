import { BaseController, Controller } from '@joktec/core';
import { ProductService } from './product.service';
import { Product } from './models';

@Controller('products')
export class ProductController extends BaseController<Product, string>({ dto: Product, useBearer: false }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
