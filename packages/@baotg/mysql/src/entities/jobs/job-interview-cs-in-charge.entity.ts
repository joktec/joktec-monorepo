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

@Expose({ name: 'job_interview_CS_in_charge' })
export class JobInterviewCsInChargeEntity extends BaseEntity {
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

export class JobInterviewCsInChargeMapper extends MysqlMapper<JobInterviewCsInChargeEntity> {
  toPersistence = (domainModel: JobInterviewCsInChargeEntity) =>
    instanceToPlain<JobInterviewCsInChargeEntity>(domainModel);
  toDomain = (persistenceModel: any): JobInterviewCsInChargeEntity =>
    plainToInstance<JobInterviewCsInChargeEntity, any>(JobInterviewCsInChargeEntity, persistenceModel);
}
