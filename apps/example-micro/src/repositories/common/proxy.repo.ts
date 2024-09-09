import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Proxy } from '../../models/schemas';

@Injectable()
export class ProxyRepo extends MongoRepo<Proxy, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Proxy);
  }
}
