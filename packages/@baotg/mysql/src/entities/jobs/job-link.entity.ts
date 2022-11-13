import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_link' })
export class JobLinkEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'create_by' })
  @IsOptional()
  @IsString()
  createBy?: string;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'last_update' })
  @IsNotEmpty()
  @IsDate()
  lastUpdate!: Date;

  @Expose({ name: 'link' })
  @IsOptional()
  @IsString()
  link?: string;

  @Expose({ name: 'update_by' })
  @IsOptional()
  @IsString()
  updateBy?: string;
}

export class JobLinkMapper extends MysqlMapper<JobLinkEntity> {
  toPersistence = (domainModel: JobLinkEntity) => instanceToPlain<JobLinkEntity>(domainModel);
  toDomain = (persistenceModel: any): JobLinkEntity =>
    plainToInstance<JobLinkEntity, any>(JobLinkEntity, persistenceModel);
}
