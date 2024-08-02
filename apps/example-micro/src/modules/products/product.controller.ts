import { ClientController, Controller, IMicroControllerProps, Transport } from '@joktec/core';
import { Product } from './models';
import { ProductService } from './product.service';

const props: IMicroControllerProps<Product> = {
  dto: Product,
  transport: Transport.REDIS,
};

@Controller('product')
export class ProductController extends ClientController<Product, string>(props) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
