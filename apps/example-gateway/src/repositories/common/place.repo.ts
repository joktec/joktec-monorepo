import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { PlaceSchema } from '../../models/schemas';

@Injectable()
export class PlaceRepo extends MongoRepo<PlaceSchema, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, PlaceSchema);
  }
}
