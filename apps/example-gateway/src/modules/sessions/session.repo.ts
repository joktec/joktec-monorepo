import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Session } from './models';

@Injectable()
export class SessionRepo extends MongoRepo<Session, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Session);
  }

  async findByTokenId(tokenId: string): Promise<Session> {
    return this.findOne({ condition: { tokenId } });
  }
}
