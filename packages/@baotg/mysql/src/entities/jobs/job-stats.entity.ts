import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_stats' })
export class JobStatsEntity extends BaseEntity {
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

  @Expose({ name: 'total_count' })
  @IsNotEmpty()
  @IsInt()
  totalCount!: number;

  @Expose({ name: 'jh_count' })
  @IsNotEmpty()
  @IsInt()
  jhCount!: number;

  @Expose({ name: 'vne_count' })
  @IsNotEmpty()
  @IsInt()
  vneCount!: number;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'organization_id' })
  @IsNotEmpty()
  @IsString()
  organizationId!: string;
}

export class JobStatsMapper extends MysqlMapper<JobStatsEntity> {
  toPersistence = (domainModel: JobStatsEntity) => instanceToPlain<JobStatsEntity>(domainModel);
  toDomain = (persistenceModel: any): JobStatsEntity =>
    plainToInstance<JobStatsEntity, any>(JobStatsEntity, persistenceModel);
}
