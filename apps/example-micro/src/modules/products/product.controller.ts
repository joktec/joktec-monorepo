import { BaseController, Controller } from '@joktec/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Controller('products')
export class ProductController extends BaseController<Product, string> {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
