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

@Expose({ name: 'job_ai_lysis' })
export class JobAiLysisEntity extends BaseEntity {
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

  @Expose({ name: 'expiry_date' })
  @IsNotEmpty()
  @IsDate()
  expiryDate!: Date;

  @Expose({ name: 'credits' })
  @IsNotEmpty()
  @IsInt()
  credits!: number;

  @Expose({ name: 'remaining_credits' })
  @IsNotEmpty()
  @IsInt()
  remainingCredits!: number;

  @Expose({ name: 'sap_company_id' })
  @IsOptional()
  @IsString()
  sapCompanyId?: string;

  @Expose({ name: 'is_verified' })
  @IsNotEmpty()
  isVerified!: unknown;

  @Expose({ name: 'updated_by' })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @Expose({ name: 'organization_id' })
  @IsNotEmpty()
  @IsString()
  organizationId!: string;
}

export class JobAiLysisMapper extends MysqlMapper<JobAiLysisEntity> {
  toPersistence = (domainModel: JobAiLysisEntity) => instanceToPlain<JobAiLysisEntity>(domainModel);
  toDomain = (persistenceModel: any): JobAiLysisEntity =>
    plainToInstance<JobAiLysisEntity, any>(JobAiLysisEntity, persistenceModel);
}
