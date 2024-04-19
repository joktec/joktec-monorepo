import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { PlaceImageSchema } from '../../models/schemas';

@Injectable()
export class PlaceImageRepo extends MongoRepo<PlaceImageSchema, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, PlaceImageSchema);
  }
}
