import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '@jobhopin/core';
import { Salary, SalaryDocument } from './schemas/salary.schema';

export class SalaryService extends BaseService<SalaryDocument> {
  constructor(
    @InjectModel(Salary.name) private salaryModel: Model<SalaryDocument>,
  ) {
    super(salaryModel);
  }
}
