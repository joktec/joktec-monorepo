import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Asset } from '../../models/entities';

@Injectable()
export class AssetRepo extends MongoRepo<Asset, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Asset);
  }
}
