import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AssignedJob,
  AssignedJobDocument,
} from './schemas/assigned-job.schema';
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseService,
  ICustomConditionQuery,
} from '@jobhopin/core';
export class AssignedJobService extends BaseService<AssignedJobDocument> {
  constructor(
    @InjectModel(AssignedJob.name)
    private benefitModel: Model<AssignedJobDocument>,
  ) {
    super(benefitModel);
  }

  async query(
    condition: BaseConditionInput,
    pagination: BasePaginationInput,
    customCondition?: ICustomConditionQuery,
  ): Promise<any> {
    return super.query(condition, pagination, customCondition);
  }
}
