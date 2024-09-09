import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Block } from '../../models/schemas';

@Injectable()
export class BlockRepo extends MongoRepo<Block, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Block);
  }
}
