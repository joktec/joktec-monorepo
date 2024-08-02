import { ClientProxy, ClientService, Inject, Injectable } from '@joktec/core';
import { TransportProvide } from '../../app.constant';
import { Product } from '../../models/entities';

@Injectable()
export class ProductService extends ClientService({ dto: Product }) {
  constructor(@Inject(TransportProvide.PRODUCT) protected client: ClientProxy) {
    super(client);
  }
}
