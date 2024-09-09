import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Artist } from '../../models/schemas';

@Injectable()
export class ArtistRepo extends MongoRepo<Artist, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Artist);
  }
}
