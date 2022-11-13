import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_interview' })
export class JobInterviewEntity extends BaseEntity {
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

  @Expose({ name: 'approved' })
  @IsNotEmpty()
  approved!: unknown;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'requested_by_id' })
  @IsOptional()
  @IsString()
  requestedById?: string;

  @Expose({ name: 'attached_contract' })
  @IsOptional()
  @IsString()
  attachedContract?: string;

  @Expose({ name: 'credits_balance' })
  @IsOptional()
  @IsInt()
  creditsBalance?: number;

  @Expose({ name: 'credits_per_interview' })
  @IsOptional()
  @IsInt()
  creditsPerInterview?: number;

  @Expose({ name: 'expiry_date' })
  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @Expose({ name: 'salary' })
  @IsNotEmpty()
  @IsInt()
  salary!: number;

  @Expose({ name: 'total_charged_credits' })
  @IsOptional()
  @IsInt()
  totalChargedCredits?: number;

  @Expose({ name: 'total_interview_budget' })
  @IsOptional()
  @IsInt()
  totalInterviewBudget?: number;

  @Expose({ name: 'status_id' })
  @IsOptional()
  @IsInt()
  statusId?: number;

  @Expose({ name: 'active' })
  @IsNotEmpty()
  active!: unknown;

  @Expose({ name: 'credits_pending' })
  @IsOptional()
  @IsInt()
  creditsPending?: number;

  @Expose({ name: 'consultant' })
  @IsOptional()
  @IsString()
  consultant?: string;
}

export class JobInterviewMapper extends MysqlMapper<JobInterviewEntity> {
  toPersistence = (domainModel: JobInterviewEntity) => instanceToPlain<JobInterviewEntity>(domainModel);
  toDomain = (persistenceModel: any): JobInterviewEntity =>
    plainToInstance<JobInterviewEntity, any>(JobInterviewEntity, persistenceModel);
}
