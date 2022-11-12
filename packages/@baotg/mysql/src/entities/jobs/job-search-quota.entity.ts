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

@Expose({ name: 'job_search_quota' })
export class JobSearchQuotaEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Expose({ name: 'js_id' })
  @IsNotEmpty()
  @IsString()
  jsId!: string;

  @Expose({ name: 'is_guest' })
  @IsNotEmpty()
  isGuest!: unknown;

  @Expose({ name: 'credits' })
  @IsNotEmpty()
  @IsInt()
  credits!: number;

  @Expose({ name: 'ful_path' })
  @IsNotEmpty()
  @IsString()
  fulPath!: string;

  @Expose({ name: 'created_at' })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @Expose({ name: 'updated_at' })
  @IsNotEmpty()
  @IsDate()
  updatedAt!: Date;
}

export class JobSearchQuotaMapper extends MysqlMapper<JobSearchQuotaEntity> {
  toPersistence = (domainModel: JobSearchQuotaEntity) => instanceToPlain<JobSearchQuotaEntity>(domainModel);
  toDomain = (persistenceModel: any): JobSearchQuotaEntity =>
    plainToInstance<JobSearchQuotaEntity, any>(JobSearchQuotaEntity, persistenceModel);
}
