import { BaseController, Controller } from '@joktec/core';
import { ProductService } from './product.service';
import { Product, ProductListResponse } from '../../models';

@Controller('products')
export class ProductController extends BaseController<Product, string>({
  dto: Product,
  dtoList: ProductListResponse,
}) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
