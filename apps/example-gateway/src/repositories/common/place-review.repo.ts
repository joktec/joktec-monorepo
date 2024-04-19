import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { PlaceReviewSchema } from '../../models/schemas';

@Injectable()
export class PlaceReviewRepo extends MongoRepo<PlaceReviewSchema, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, PlaceReviewSchema);
  }
}
