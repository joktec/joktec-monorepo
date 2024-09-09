import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Notification } from '../../models/schemas';

@Injectable()
export class NotificationRepo extends MongoRepo<Notification, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Notification);
  }
}
