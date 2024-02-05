import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Room } from '../../models/entities';

@Injectable()
export class RoomRepo extends MongoRepo<Room, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Room);
  }
}
