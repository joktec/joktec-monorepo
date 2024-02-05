import { ClientProxy, ClientService, Inject, Injectable } from '@joktec/core';
import { Product } from '../../models/entities';

@Injectable()
export class ProductService extends ClientService({ dto: Product }) {
  constructor(@Inject('PRODUCT_SERVICE') protected client: ClientProxy) {
    super(client);
  }
}
