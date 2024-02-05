import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Order } from '../../models/entities';

@Injectable()
export class OrderRepo extends MongoRepo<Order, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Order);
  }
}
