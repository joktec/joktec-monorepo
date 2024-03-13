import { BaseController, Controller, IControllerProps } from '@joktec/core';
import { AuthGuard, RoleGuard } from '../../base';
import { Product } from '../../models/entities';
import { ProductService } from './product.service';

const props: IControllerProps<Product> = {
  dto: Product,
  guards: [AuthGuard, RoleGuard],
  useBearer: true,
};

@Controller('products')
export class ProductController extends BaseController<Product, string>(props) {
  constructor(protected productService: ProductService) {
    super(productService);
  }
}
