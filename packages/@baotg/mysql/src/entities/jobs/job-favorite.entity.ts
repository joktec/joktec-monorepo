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

@Expose({ name: 'job_favorite' })
export class JobFavoriteEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'favourite' })
  @IsOptional()
  @IsInt()
  favourite?: number;

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

export class JobFavoriteMapper extends MysqlMapper<JobFavoriteEntity> {
  toPersistence = (domainModel: JobFavoriteEntity) => instanceToPlain<JobFavoriteEntity>(domainModel);
  toDomain = (persistenceModel: any): JobFavoriteEntity =>
    plainToInstance<JobFavoriteEntity, any>(JobFavoriteEntity, persistenceModel);
}
