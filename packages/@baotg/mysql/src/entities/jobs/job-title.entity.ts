import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_title' })
export class JobTitleEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'name' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Expose({ name: 'name_en' })
  @IsNotEmpty()
  @IsString()
  nameEn!: string;

  @Expose({ name: 'priority' })
  @IsOptional()
  @IsInt()
  priority?: number;
}

export class JobTitleMapper extends MysqlMapper<JobTitleEntity> {
  toPersistence = (domainModel: JobTitleEntity) => instanceToPlain<JobTitleEntity>(domainModel);
  toDomain = (persistenceModel: any): JobTitleEntity =>
    plainToInstance<JobTitleEntity, any>(JobTitleEntity, persistenceModel);
}
