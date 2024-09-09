import { BaseService, Injectable } from '@joktec/core';
import { Report } from '../../models/schemas';
import { ReportRepo } from '../../repositories';

@Injectable()
export class ReportService extends BaseService<Report, string> {
  constructor(protected reportRepo: ReportRepo) {
    super(reportRepo);
  }
}
