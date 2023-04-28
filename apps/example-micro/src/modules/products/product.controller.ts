import { MicroserviceController, Controller } from '@joktec/core';
import { ProductService } from './product.service';
import { Product } from './models';

@Controller()
export class ProductController extends MicroserviceController<Product, string>({ dto: Product }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
