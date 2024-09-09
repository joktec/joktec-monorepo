import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Inquiry } from '../../models/schemas';

@Injectable()
export class InquiryRepo extends MongoRepo<Inquiry, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Inquiry);
  }
}
