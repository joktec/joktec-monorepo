import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_version' })
export class JobVersionEntity extends BaseEntity {
  @Expose({ name: 'job_version_id' })
  @IsNotEmpty()
  @IsString()
  jobVersionId!: string;

  @Expose({ name: 'address' })
  @IsOptional()
  @IsString()
  address?: string;

  @Expose({ name: 'benefit' })
  @IsOptional()
  @IsString()
  benefit?: string;

  @Expose({ name: 'benefit_other' })
  @IsOptional()
  @IsString()
  benefitOther?: string;

  @Expose({ name: 'city_id' })
  @IsOptional()
  @IsString()
  cityId?: string;

  @Expose({ name: 'create_by' })
  @IsOptional()
  @IsString()
  createBy?: string;

  @Expose({ name: 'create_date' })
  @IsNotEmpty()
  @IsDate()
  createDate!: Date;

  @Expose({ name: 'deleted' })
  @IsOptional()
  deleted?: unknown;

  @Expose({ name: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @Expose({ name: 'description_text' })
  @IsOptional()
  @IsString()
  descriptionText?: string;

  @Expose({ name: 'district_id' })
  @IsOptional()
  @IsString()
  districtId?: string;

  @Expose({ name: 'image' })
  @IsOptional()
  @IsString()
  image?: string;

  @Expose({ name: 'industry_id' })
  @IsOptional()
  @IsString()
  industryId?: string;

  @Expose({ name: 'job_id' })
  @IsOptional()
  @IsString()
  jobId?: string;

  @Expose({ name: 'job_type_id' })
  @IsOptional()
  @IsString()
  jobTypeId?: string;

  @Expose({ name: 'job_working_time' })
  @IsOptional()
  @IsString()
  jobWorkingTime?: string;

  @Expose({ name: 'language_id' })
  @IsOptional()
  @IsString()
  languageId?: string;

  @Expose({ name: 'level_id' })
  @IsOptional()
  @IsString()
  levelId?: string;

  @Expose({ name: 'location' })
  @IsOptional()
  @IsString()
  location?: string;

  @Expose({ name: 'position' })
  @IsOptional()
  @IsString()
  position?: string;

  @Expose({ name: 'quantity' })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @Expose({ name: 'request_date' })
  @IsOptional()
  @IsDate()
  requestDate?: Date;

  @Expose({ name: 'requirement' })
  @IsOptional()
  @IsString()
  requirement?: string;

  @Expose({ name: 'salary_currency' })
  @IsOptional()
  @IsString()
  salaryCurrency?: string;

  @Expose({ name: 'salary_max' })
  @IsOptional()
  @IsInt()
  salaryMax?: number;

  @Expose({ name: 'salary_min' })
  @IsOptional()
  @IsInt()
  salaryMin?: number;

  @Expose({ name: 'salary_option' })
  @IsOptional()
  salaryOption?: unknown;

  @Expose({ name: 'status' })
  @IsOptional()
  @IsString()
  status?: string;

  @Expose({ name: 'tags' })
  @IsOptional()
  @IsString()
  tags?: string;

  @Expose({ name: 'version_number' })
  @IsOptional()
  @IsInt()
  versionNumber?: number;
}

export class JobVersionMapper extends MysqlMapper<JobVersionEntity> {
  toPersistence = (domainModel: JobVersionEntity) => instanceToPlain<JobVersionEntity>(domainModel);
  toDomain = (persistenceModel: any): JobVersionEntity =>
    plainToInstance<JobVersionEntity, any>(JobVersionEntity, persistenceModel);
}
