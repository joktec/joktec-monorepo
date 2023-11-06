import { ClientController, Controller } from '@joktec/core';
import { Product } from './models';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController extends ClientController<Product, string>({ dto: Product }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
