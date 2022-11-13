import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_budget_suggest_info' })
export class JobBudgetSuggestInfoEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'info' })
  @IsOptional()
  info?: unknown;

  @Expose({ name: 'created' })
  @IsNotEmpty()
  @IsDate()
  created!: Date;

  @Expose({ name: 'updated' })
  @IsNotEmpty()
  @IsDate()
  updated!: Date;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'credit_balance' })
  @IsNotEmpty()
  @IsInt()
  creditBalance!: number;
}

export class JobBudgetSuggestInfoMapper extends MysqlMapper<JobBudgetSuggestInfoEntity> {
  toPersistence = (domainModel: JobBudgetSuggestInfoEntity) => instanceToPlain<JobBudgetSuggestInfoEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBudgetSuggestInfoEntity =>
    plainToInstance<JobBudgetSuggestInfoEntity, any>(JobBudgetSuggestInfoEntity, persistenceModel);
}
