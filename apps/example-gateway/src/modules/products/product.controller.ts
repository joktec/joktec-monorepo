import { BaseController, Controller, ApiTags } from '@joktec/core';
import { ProductService } from './product.service';
import { Product } from '../../models';

@ApiTags('products')
@Controller('products')
export class ProductController extends BaseController<Product, string> {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
