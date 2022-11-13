import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_budget' })
export class JobBudgetEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'total_credits' })
  @IsNotEmpty()
  @IsInt()
  totalCredits!: number;

  @Expose({ name: 'remaining_credits' })
  @IsNotEmpty()
  @IsInt()
  remainingCredits!: number;

  @Expose({ name: 'view_count' })
  @IsNotEmpty()
  @IsInt()
  viewCount!: number;

  @Expose({ name: 'candidate_count' })
  @IsNotEmpty()
  @IsInt()
  candidateCount!: number;

  @Expose({ name: 'active' })
  @IsNotEmpty()
  active!: unknown;

  @Expose({ name: 'expiry_date' })
  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @Expose({ name: 'created' })
  @IsNotEmpty()
  @IsDate()
  created!: Date;

  @Expose({ name: 'updated' })
  @IsNotEmpty()
  @IsDate()
  updated!: Date;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'platform' })
  @IsNotEmpty()
  @IsInt()
  platform!: number;
}

export class JobBudgetMapper extends MysqlMapper<JobBudgetEntity> {
  toPersistence = (domainModel: JobBudgetEntity) => instanceToPlain<JobBudgetEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBudgetEntity =>
    plainToInstance<JobBudgetEntity, any>(JobBudgetEntity, persistenceModel);
}
