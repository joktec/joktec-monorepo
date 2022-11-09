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

@Expose({ name: 'job_templates' })
export class JobTemplatesEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'title' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Expose({ name: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @Expose({ name: 'requirement' })
  @IsOptional()
  @IsString()
  requirement?: string;

  @Expose({ name: 'is_active' })
  @IsNotEmpty()
  isActive!: unknown;

  @Expose({ name: 'created_by' })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @Expose({ name: 'updated_by' })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @Expose({ name: 'created_at' })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Expose({ name: 'updated_at' })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @Expose({ name: 'level_id' })
  @IsOptional()
  @IsString()
  levelId?: string;

  @Expose({ name: 'industry_id' })
  @IsOptional()
  @IsInt()
  industryId?: number;

  @Expose({ name: 'language' })
  @IsOptional()
  @IsString()
  language?: string;

  @Expose({ name: 'description_eng' })
  @IsOptional()
  @IsString()
  descriptionEng?: string;

  @Expose({ name: 'requirement_eng' })
  @IsOptional()
  @IsString()
  requirementEng?: string;
}

export class JobTemplatesMapper extends MysqlMapper<JobTemplatesEntity> {
  toPersistence = (domainModel: JobTemplatesEntity) => instanceToPlain<JobTemplatesEntity>(domainModel);
  toDomain = (persistenceModel: any): JobTemplatesEntity =>
    plainToInstance<JobTemplatesEntity, any>(JobTemplatesEntity, persistenceModel);
}
