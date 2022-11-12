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

@Expose({ name: 'job_interview_category' })
export class JobInterviewCategoryEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'created' })
  @IsNotEmpty()
  @IsDate()
  created!: Date;

  @Expose({ name: 'updated' })
  @IsNotEmpty()
  @IsDate()
  updated!: Date;

  @Expose({ name: 'name' })
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class JobInterviewCategoryMapper extends MysqlMapper<JobInterviewCategoryEntity> {
  toPersistence = (domainModel: JobInterviewCategoryEntity) => instanceToPlain<JobInterviewCategoryEntity>(domainModel);
  toDomain = (persistenceModel: any): JobInterviewCategoryEntity =>
    plainToInstance<JobInterviewCategoryEntity, any>(JobInterviewCategoryEntity, persistenceModel);
}
