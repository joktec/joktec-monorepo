import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Otp } from './models';

@Injectable()
export class OtpRepo extends MongoRepo<Otp, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Otp);
  }
}
