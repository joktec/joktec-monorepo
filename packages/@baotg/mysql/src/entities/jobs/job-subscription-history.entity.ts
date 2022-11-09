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

@Expose({ name: 'job_subscription_history' })
export class JobSubscriptionHistoryEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'job_name' })
  @IsOptional()
  @IsString()
  jobName?: string;

  @Expose({ name: 'prev_job_type' })
  @IsOptional()
  @IsString()
  prevJobType?: string;

  @Expose({ name: 'cur_job_type' })
  @IsOptional()
  @IsString()
  curJobType?: string;

  @Expose({ name: 'updated_at' })
  @IsNotEmpty()
  @IsDate()
  updatedAt!: Date;

  @Expose({ name: 'user_email' })
  @IsOptional()
  @IsString()
  userEmail?: string;

  @Expose({ name: 'job_id_id' })
  @IsNotEmpty()
  @IsString()
  jobIdId!: string;
}

export class JobSubscriptionHistoryMapper extends MysqlMapper<JobSubscriptionHistoryEntity> {
  toPersistence = (domainModel: JobSubscriptionHistoryEntity) =>
    instanceToPlain<JobSubscriptionHistoryEntity>(domainModel);
  toDomain = (persistenceModel: any): JobSubscriptionHistoryEntity =>
    plainToInstance<JobSubscriptionHistoryEntity, any>(JobSubscriptionHistoryEntity, persistenceModel);
}
