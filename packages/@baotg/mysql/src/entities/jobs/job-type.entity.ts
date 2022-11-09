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

@Expose({ name: 'job_type' })
export class JobTypeEntity extends BaseEntity {
  @Expose({ name: 'job_type_id' })
  @IsNotEmpty()
  @IsString()
  jobTypeId!: string;

  @Expose({ name: 'code' })
  @IsOptional()
  @IsString()
  code?: string;

  @Expose({ name: 'create_by' })
  @IsOptional()
  @IsString()
  createBy?: string;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'last_update' })
  @IsNotEmpty()
  @IsDate()
  lastUpdate!: Date;

  @Expose({ name: 'name' })
  @IsOptional()
  @IsString()
  name?: string;

  @Expose({ name: 'name_eng' })
  @IsOptional()
  @IsString()
  nameEng?: string;

  @Expose({ name: 'update_by' })
  @IsOptional()
  @IsString()
  updateBy?: string;

  @Expose({ name: 'priority' })
  @IsOptional()
  @IsInt()
  priority?: number;
}

export class JobTypeMapper extends MysqlMapper<JobTypeEntity> {
  toPersistence = (domainModel: JobTypeEntity) => instanceToPlain<JobTypeEntity>(domainModel);
  toDomain = (persistenceModel: any): JobTypeEntity =>
    plainToInstance<JobTypeEntity, any>(JobTypeEntity, persistenceModel);
}
