import { ClientController, Controller, Transport } from '@joktec/core';
import { Product } from './models';
import { ProductService } from './product.service';

@Controller()
export class ProductController extends ClientController<Product, string>({ dto: Product, transport: Transport.TCP }) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
