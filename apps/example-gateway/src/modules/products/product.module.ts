import { Module, TransportProxyFactory } from '@joktec/core';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, TransportProxyFactory('PRODUCT_SERVICE', 'RabbitTransport')],
  exports: [ProductService],
})
export class ProductModule {}
