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

@Expose({ name: 'job_interview_TI_in_charge' })
export class JobInterviewTiInChargeEntity extends BaseEntity {
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

export class JobInterviewTiInChargeMapper extends MysqlMapper<JobInterviewTiInChargeEntity> {
  toPersistence = (domainModel: JobInterviewTiInChargeEntity) =>
    instanceToPlain<JobInterviewTiInChargeEntity>(domainModel);
  toDomain = (persistenceModel: any): JobInterviewTiInChargeEntity =>
    plainToInstance<JobInterviewTiInChargeEntity, any>(JobInterviewTiInChargeEntity, persistenceModel);
}
