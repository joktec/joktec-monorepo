import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_budget_history' })
export class JobBudgetHistoryEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'description' })
  @IsNotEmpty()
  @IsInt()
  description!: number;

  @Expose({ name: 'balance' })
  @IsNotEmpty()
  @IsInt()
  balance!: number;

  @Expose({ name: 'prev_balance' })
  @IsNotEmpty()
  @IsInt()
  prevBalance!: number;

  @Expose({ name: 'credits' })
  @IsNotEmpty()
  @IsInt()
  credits!: number;

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

  @Expose({ name: 'platform' })
  @IsNotEmpty()
  @IsInt()
  platform!: number;
}

export class JobBudgetHistoryMapper extends MysqlMapper<JobBudgetHistoryEntity> {
  toPersistence = (domainModel: JobBudgetHistoryEntity) => instanceToPlain<JobBudgetHistoryEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBudgetHistoryEntity =>
    plainToInstance<JobBudgetHistoryEntity, any>(JobBudgetHistoryEntity, persistenceModel);
}
