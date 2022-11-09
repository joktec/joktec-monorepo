import {
  Expose,
  instanceToPlain,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  plainToInstance,
} from '@jobhopin/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_budget_request' })
export class JobBudgetRequestEntity extends BaseEntity {
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

  @Expose({ name: 'status' })
  @IsNotEmpty()
  @IsString()
  status!: string;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'request_by_id' })
  @IsOptional()
  @IsString()
  requestById?: string;

  @Expose({ name: 'sent_reminder' })
  @IsNotEmpty()
  sentReminder!: unknown;
}

export class JobBudgetRequestMapper extends MysqlMapper<JobBudgetRequestEntity> {
  toPersistence = (domainModel: JobBudgetRequestEntity) => instanceToPlain<JobBudgetRequestEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBudgetRequestEntity =>
    plainToInstance<JobBudgetRequestEntity, any>(JobBudgetRequestEntity, persistenceModel);
}
