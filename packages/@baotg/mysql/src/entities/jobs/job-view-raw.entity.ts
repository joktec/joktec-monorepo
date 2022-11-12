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

@Expose({ name: 'job_view_raw' })
export class JobViewRawEntity extends BaseEntity {
  @Expose({ name: 'view_id' })
  @IsNotEmpty()
  @IsInt()
  viewId!: number;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'user_id' })
  @IsOptional()
  @IsString()
  userId?: string;
}

export class JobViewRawMapper extends MysqlMapper<JobViewRawEntity> {
  toPersistence = (domainModel: JobViewRawEntity) => instanceToPlain<JobViewRawEntity>(domainModel);
  toDomain = (persistenceModel: any): JobViewRawEntity =>
    plainToInstance<JobViewRawEntity, any>(JobViewRawEntity, persistenceModel);
}
