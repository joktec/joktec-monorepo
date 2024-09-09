import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Credential } from '../../models/schemas';

@Injectable()
export class CredentialRepo extends MongoRepo<Credential, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Credential);
  }
}
