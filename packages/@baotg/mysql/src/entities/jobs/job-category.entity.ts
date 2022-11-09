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

@Expose({ name: 'job_category' })
export class JobCategoryEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'name' })
  @IsOptional()
  @IsString()
  name?: string;

  @Expose({ name: 'name_eng' })
  @IsOptional()
  @IsString()
  nameEng?: string;

  @Expose({ name: 'created_at' })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Expose({ name: 'updated_at' })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @Expose({ name: 'priority' })
  @IsOptional()
  @IsInt()
  priority?: number;

  @Expose({ name: 'code' })
  @IsOptional()
  @IsString()
  code?: string;

  @Expose({ name: 'active' })
  @IsNotEmpty()
  active!: unknown;
}

export class JobCategoryMapper extends MysqlMapper<JobCategoryEntity> {
  toPersistence = (domainModel: JobCategoryEntity) => instanceToPlain<JobCategoryEntity>(domainModel);
  toDomain = (persistenceModel: any): JobCategoryEntity =>
    plainToInstance<JobCategoryEntity, any>(JobCategoryEntity, persistenceModel);
}
