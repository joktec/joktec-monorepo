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

@Expose({ name: 'job_bounty_history' })
export class JobBountyHistoryEntity extends BaseEntity {
  @Expose({ name: 'id' })
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @Expose({ name: 'created_at' })
  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  @Expose({ name: 'updated_at' })
  @IsNotEmpty()
  @IsDate()
  updatedAt!: Date;

  @Expose({ name: 'action' })
  @IsNotEmpty()
  @IsString()
  action!: string;

  @Expose({ name: 'user_email' })
  @IsNotEmpty()
  @IsString()
  userEmail!: string;

  @Expose({ name: 'job_bounty_id' })
  @IsNotEmpty()
  @IsInt()
  jobBountyId!: number;
}

export class JobBountyHistoryMapper extends MysqlMapper<JobBountyHistoryEntity> {
  toPersistence = (domainModel: JobBountyHistoryEntity) => instanceToPlain<JobBountyHistoryEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBountyHistoryEntity =>
    plainToInstance<JobBountyHistoryEntity, any>(JobBountyHistoryEntity, persistenceModel);
}
