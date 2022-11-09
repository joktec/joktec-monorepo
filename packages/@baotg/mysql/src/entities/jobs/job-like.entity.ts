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

@Expose({ name: 'job_like' })
export class JobLikeEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'like' })
  @IsOptional()
  like?: unknown;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'last_update' })
  @IsNotEmpty()
  @IsDate()
  lastUpdate!: Date;

  @Expose({ name: 'username' })
  @IsOptional()
  @IsString()
  username?: string;
}

export class JobLikeMapper extends MysqlMapper<JobLikeEntity> {
  toPersistence = (domainModel: JobLikeEntity) => instanceToPlain<JobLikeEntity>(domainModel);
  toDomain = (persistenceModel: any): JobLikeEntity =>
    plainToInstance<JobLikeEntity, any>(JobLikeEntity, persistenceModel);
}
