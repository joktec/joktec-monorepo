import { ClientProxy, Inject, Injectable, MicroserviceClient } from '@joktec/core';
import { Product } from './models';

@Injectable()
export class ProductService extends MicroserviceClient({ dto: Product }) {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {
    super(client);
  }
}
