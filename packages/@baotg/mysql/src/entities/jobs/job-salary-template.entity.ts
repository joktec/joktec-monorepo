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

@Expose({ name: 'job_salary_template' })
export class JobSalaryTemplateEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'avg_salary' })
  @IsOptional()
  @IsString()
  avgSalary?: string;

  @Expose({ name: 'experience_year' })
  @IsOptional()
  @IsString()
  experienceYear?: string;

  @Expose({ name: 'industry' })
  @IsOptional()
  @IsString()
  industry?: string;

  @Expose({ name: 'last_update' })
  @IsNotEmpty()
  @IsDate()
  lastUpdate!: Date;

  @Expose({ name: 'max_salary' })
  @IsOptional()
  @IsString()
  maxSalary?: string;

  @Expose({ name: 'min_salary' })
  @IsOptional()
  @IsString()
  minSalary?: string;

  @Expose({ name: 'region' })
  @IsOptional()
  @IsString()
  region?: string;

  @Expose({ name: 'title' })
  @IsOptional()
  @IsString()
  title?: string;
}

export class JobSalaryTemplateMapper extends MysqlMapper<JobSalaryTemplateEntity> {
  toPersistence = (domainModel: JobSalaryTemplateEntity) => instanceToPlain<JobSalaryTemplateEntity>(domainModel);
  toDomain = (persistenceModel: any): JobSalaryTemplateEntity =>
    plainToInstance<JobSalaryTemplateEntity, any>(JobSalaryTemplateEntity, persistenceModel);
}
