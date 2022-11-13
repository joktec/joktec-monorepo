import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_view' })
export class JobViewEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'num_views' })
  @IsNotEmpty()
  @IsInt()
  numViews!: number;

  @Expose({ name: 'time_views' })
  @IsNotEmpty()
  @IsDate()
  timeViews!: Date;
}

export class JobViewMapper extends MysqlMapper<JobViewEntity> {
  toPersistence = (domainModel: JobViewEntity) => instanceToPlain<JobViewEntity>(domainModel);
  toDomain = (persistenceModel: any): JobViewEntity =>
    plainToInstance<JobViewEntity, any>(JobViewEntity, persistenceModel);
}
