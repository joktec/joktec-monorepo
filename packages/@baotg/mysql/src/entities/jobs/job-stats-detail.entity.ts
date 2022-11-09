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

@Expose({ name: 'job_stats_detail' })
export class JobStatsDetailEntity extends BaseEntity {
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

  @Expose({ name: 'platform' })
  @IsNotEmpty()
  @IsInt()
  platform!: number;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'organization_id' })
  @IsNotEmpty()
  @IsString()
  organizationId!: string;
}

export class JobStatsDetailMapper extends MysqlMapper<JobStatsDetailEntity> {
  toPersistence = (domainModel: JobStatsDetailEntity) => instanceToPlain<JobStatsDetailEntity>(domainModel);
  toDomain = (persistenceModel: any): JobStatsDetailEntity =>
    plainToInstance<JobStatsDetailEntity, any>(JobStatsDetailEntity, persistenceModel);
}
