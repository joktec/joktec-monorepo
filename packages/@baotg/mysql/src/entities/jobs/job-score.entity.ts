import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_score' })
export class JobScoreEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;

  @Expose({ name: 'score' })
  @IsOptional()
  @IsInt()
  score?: number;
}

export class JobScoreMapper extends MysqlMapper<JobScoreEntity> {
  toPersistence = (domainModel: JobScoreEntity) => instanceToPlain<JobScoreEntity>(domainModel);
  toDomain = (persistenceModel: any): JobScoreEntity =>
    plainToInstance<JobScoreEntity, any>(JobScoreEntity, persistenceModel);
}
