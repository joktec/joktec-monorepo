import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_interview_SC_in_charge' })
export class JobInterviewScInChargeEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'jobinterview_id' })
  @IsNotEmpty()
  @IsInt()
  jobinterviewId!: number;

  @Expose({ name: 'user_id' })
  @IsNotEmpty()
  @IsInt()
  userId!: number;
}

export class JobInterviewScInChargeMapper extends MysqlMapper<JobInterviewScInChargeEntity> {
  toPersistence = (domainModel: JobInterviewScInChargeEntity) =>
    instanceToPlain<JobInterviewScInChargeEntity>(domainModel);
  toDomain = (persistenceModel: any): JobInterviewScInChargeEntity =>
    plainToInstance<JobInterviewScInChargeEntity, any>(JobInterviewScInChargeEntity, persistenceModel);
}
