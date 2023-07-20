import { MicroserviceController, Controller } from '@joktec/core';
import { Product } from './models';
import { ProductService } from './product.service';

@Controller()
export class ProductController extends MicroserviceController<Product, string>({ dto: Product }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
