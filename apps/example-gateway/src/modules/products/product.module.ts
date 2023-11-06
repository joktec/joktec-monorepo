import { ClientProxyFactory, ConfigService, Module, Transport } from '@joktec/core';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_SERVICE',
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        // const microservices: any[] = cfg.get('microservices');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: 'localhost', port: 8010 },
        });
      },
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
