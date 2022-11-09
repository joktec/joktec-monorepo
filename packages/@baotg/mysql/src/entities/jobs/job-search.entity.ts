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

@Expose({ name: 'job_search' })
export class JobSearchEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @Expose({ name: 'created_at' })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @Expose({ name: 'params' })
  @IsOptional()
  @IsString()
  params?: string;

  @Expose({ name: 'path' })
  @IsOptional()
  @IsString()
  path?: string;
}

export class JobSearchMapper extends MysqlMapper<JobSearchEntity> {
  toPersistence = (domainModel: JobSearchEntity) => instanceToPlain<JobSearchEntity>(domainModel);
  toDomain = (persistenceModel: any): JobSearchEntity =>
    plainToInstance<JobSearchEntity, any>(JobSearchEntity, persistenceModel);
}
