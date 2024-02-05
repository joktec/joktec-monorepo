import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Apartment } from '../../models/entities';

@Injectable()
export class ApartmentRepo extends MongoRepo<Apartment, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Apartment);
  }
}
