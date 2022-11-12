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

@Expose({ name: 'job_budget_log' })
export class JobBudgetLogEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

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

  @Expose({ name: 'created_by_id' })
  @IsOptional()
  @IsString()
  createdById?: string;

  @Expose({ name: 'event_type' })
  @IsNotEmpty()
  @IsInt()
  eventType!: number;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'updated_by_id' })
  @IsOptional()
  @IsString()
  updatedById?: string;

  @Expose({ name: 'is_thumbed_up' })
  @IsNotEmpty()
  isThumbedUp!: unknown;

  @Expose({ name: 'candidate_id' })
  @IsOptional()
  @IsString()
  candidateId?: string;

  @Expose({ name: 'remaining_credits' })
  @IsOptional()
  @IsInt()
  remainingCredits?: number;

  @Expose({ name: 'staff_user' })
  @IsOptional()
  @IsString()
  staffUser?: string;

  @Expose({ name: 'prev_balance' })
  @IsNotEmpty()
  @IsInt()
  prevBalance!: number;

  @Expose({ name: 'platform' })
  @IsNotEmpty()
  @IsInt()
  platform!: number;

  @Expose({ name: 'note' })
  @IsOptional()
  @IsString()
  note?: string;

  @Expose({ name: 'org_remaining_credits' })
  @IsOptional()
  @IsInt()
  orgRemainingCredits?: number;

  @Expose({ name: 'organization_id' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @Expose({ name: 'org_total_credits' })
  @IsOptional()
  @IsInt()
  orgTotalCredits?: number;

  @Expose({ name: 'is_negative' })
  @IsNotEmpty()
  isNegative!: unknown;

  @Expose({ name: 'total_interview_budget' })
  @IsOptional()
  @IsInt()
  totalInterviewBudget?: number;

  @Expose({ name: 'type' })
  @IsNotEmpty()
  @IsInt()
  type!: number;
}

export class JobBudgetLogMapper extends MysqlMapper<JobBudgetLogEntity> {
  toPersistence = (domainModel: JobBudgetLogEntity) => instanceToPlain<JobBudgetLogEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBudgetLogEntity =>
    plainToInstance<JobBudgetLogEntity, any>(JobBudgetLogEntity, persistenceModel);
}
