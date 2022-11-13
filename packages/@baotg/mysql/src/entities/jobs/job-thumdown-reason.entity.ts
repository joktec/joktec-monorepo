import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_thumdown_reason' })
export class JobThumdownReasonEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'other_reason' })
  @IsOptional()
  @IsString()
  otherReason?: string;

  @Expose({ name: 'created_at' })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'jobseeker_id' })
  @IsOptional()
  @IsString()
  jobseekerId?: string;

  @Expose({ name: 'thumbdown_reasons_id' })
  @IsOptional()
  @IsInt()
  thumbdownReasonsId?: number;
}

export class JobThumdownReasonMapper extends MysqlMapper<JobThumdownReasonEntity> {
  toPersistence = (domainModel: JobThumdownReasonEntity) => instanceToPlain<JobThumdownReasonEntity>(domainModel);
  toDomain = (persistenceModel: any): JobThumdownReasonEntity =>
    plainToInstance<JobThumdownReasonEntity, any>(JobThumdownReasonEntity, persistenceModel);
}
