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

@Expose({ name: 'job_title_salary_range' })
export class JobTitleSalaryRangeEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'job_title' })
  @IsNotEmpty()
  @IsString()
  jobTitle!: string;

  @Expose({ name: 'salary_min' })
  @IsNotEmpty()
  @IsInt()
  salaryMin!: number;

  @Expose({ name: 'salary_max' })
  @IsNotEmpty()
  @IsInt()
  salaryMax!: number;
}

export class JobTitleSalaryRangeMapper extends MysqlMapper<JobTitleSalaryRangeEntity> {
  toPersistence = (domainModel: JobTitleSalaryRangeEntity) => instanceToPlain<JobTitleSalaryRangeEntity>(domainModel);
  toDomain = (persistenceModel: any): JobTitleSalaryRangeEntity =>
    plainToInstance<JobTitleSalaryRangeEntity, any>(JobTitleSalaryRangeEntity, persistenceModel);
}
