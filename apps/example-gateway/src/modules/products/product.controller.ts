import { BaseController, Controller } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { Product } from './models';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController extends BaseController<Product, string>({
  dto: Product,
  bearer: AuthGuard,
  guards: RoleGuard,
}) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
