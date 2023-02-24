import { BaseResponseInterceptor, BaseController, Controller, UseInterceptors } from '@joktec/core';
import { ProductService } from './product.service';
import { Product } from '../../models';

@Controller('products')
@UseInterceptors(BaseResponseInterceptor)
export class ProductController extends BaseController<Product, string> {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
