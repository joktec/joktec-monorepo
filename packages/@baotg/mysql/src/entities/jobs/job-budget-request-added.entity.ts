import {
  Expose,
  instanceToPlain,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  plainToInstance,
} from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_budget_request_added' })
export class JobBudgetRequestAddedEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'created' })
  @IsNotEmpty()
  @IsDate()
  created!: Date;

  @Expose({ name: 'updated' })
  @IsNotEmpty()
  @IsDate()
  updated!: Date;

  @Expose({ name: 'updated_budget' })
  @IsNotEmpty()
  updatedBudget!: unknown;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'paid_by_id' })
  @IsOptional()
  @IsString()
  paidById?: string;

  @Expose({ name: 'sent_reminder' })
  @IsNotEmpty()
  sentReminder!: unknown;
}

export class JobBudgetRequestAddedMapper extends MysqlMapper<JobBudgetRequestAddedEntity> {
  toPersistence = (domainModel: JobBudgetRequestAddedEntity) =>
    instanceToPlain<JobBudgetRequestAddedEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBudgetRequestAddedEntity =>
    plainToInstance<JobBudgetRequestAddedEntity, any>(JobBudgetRequestAddedEntity, persistenceModel);
}
