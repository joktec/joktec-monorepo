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

@Expose({ name: 'job_board_apply_log' })
export class JobBoardApplyLogEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'jobseeker_id' })
  @IsOptional()
  @IsString()
  jobseekerId?: string;

  @Expose({ name: 'cv_id' })
  @IsOptional()
  @IsString()
  cvId?: string;

  @Expose({ name: 'cv_link' })
  @IsOptional()
  @IsString()
  cvLink?: string;

  @Expose({ name: 'job_board' })
  @IsOptional()
  @IsString()
  jobBoard?: string;

  @Expose({ name: 'job_board_link' })
  @IsOptional()
  @IsString()
  jobBoardLink?: string;

  @Expose({ name: 'apply_time' })
  @IsNotEmpty()
  @IsDate()
  applyTime!: Date;

  @Expose({ name: 'message' })
  @IsOptional()
  @IsString()
  message?: string;

  @Expose({ name: 'screenshot_file' })
  @IsOptional()
  @IsString()
  screenshotFile?: string;

  @Expose({ name: 'status' })
  @IsNotEmpty()
  @IsString()
  status!: string;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;
}

export class JobBoardApplyLogMapper extends MysqlMapper<JobBoardApplyLogEntity> {
  toPersistence = (domainModel: JobBoardApplyLogEntity) => instanceToPlain<JobBoardApplyLogEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBoardApplyLogEntity =>
    plainToInstance<JobBoardApplyLogEntity, any>(JobBoardApplyLogEntity, persistenceModel);
}
