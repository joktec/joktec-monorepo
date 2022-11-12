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

@Expose({ name: 'job_template' })
export class JobTemplateEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'benefit_en' })
  @IsOptional()
  @IsString()
  benefitEn?: string;

  @Expose({ name: 'benefit_vi' })
  @IsOptional()
  @IsString()
  benefitVi?: string;

  @Expose({ name: 'description_en' })
  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @Expose({ name: 'description_vi' })
  @IsOptional()
  @IsString()
  descriptionVi?: string;

  @Expose({ name: 'industry_en' })
  @IsOptional()
  @IsString()
  industryEn?: string;

  @Expose({ name: 'industry_vi' })
  @IsOptional()
  @IsString()
  industryVi?: string;

  @Expose({ name: 'last_update' })
  @IsNotEmpty()
  @IsDate()
  lastUpdate!: Date;

  @Expose({ name: 'requirement_en' })
  @IsOptional()
  @IsString()
  requirementEn?: string;

  @Expose({ name: 'requirement_vi' })
  @IsOptional()
  @IsString()
  requirementVi?: string;

  @Expose({ name: 'title' })
  @IsOptional()
  @IsString()
  title?: string;
}

export class JobTemplateMapper extends MysqlMapper<JobTemplateEntity> {
  toPersistence = (domainModel: JobTemplateEntity) => instanceToPlain<JobTemplateEntity>(domainModel);
  toDomain = (persistenceModel: any): JobTemplateEntity =>
    plainToInstance<JobTemplateEntity, any>(JobTemplateEntity, persistenceModel);
}
