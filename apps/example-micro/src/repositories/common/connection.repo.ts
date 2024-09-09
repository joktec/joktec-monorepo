import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Connection } from '../../models/schemas';

@Injectable()
export class ConnectionRepo extends MongoRepo<Connection, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Connection);
  }
}
