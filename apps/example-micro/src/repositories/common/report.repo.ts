import { Injectable } from '@joktec/core';
import { MongoRepo, MongoService } from '@joktec/mongo';
import { Report } from '../../models/schemas';

@Injectable()
export class ReportRepo extends MongoRepo<Report, string> {
  constructor(protected mongoService: MongoService) {
    super(mongoService, Report);
  }
}
