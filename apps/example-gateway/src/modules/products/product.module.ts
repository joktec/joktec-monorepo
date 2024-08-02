import { Module, TransportProxyFactory } from '@joktec/core';
import { TransportName, TransportProvide } from '../../app.constant';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, TransportProxyFactory(TransportProvide.PRODUCT, TransportName.Redis)],
  exports: [ProductService],
})
export class ProductModule {}
