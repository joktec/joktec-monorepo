import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Room } from './models';

@Injectable()
export class RoomRepo extends MongoRepo<Room, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Room);
  }
}
