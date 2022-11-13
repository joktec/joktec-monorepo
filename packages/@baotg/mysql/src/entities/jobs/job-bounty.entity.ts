import { Expose, instanceToPlain, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, plainToInstance } from '@baotg/core';
import { BaseEntity } from '../base.entity';
import { MysqlMapper } from '../../models';

@Expose({ name: 'job_bounty' })
export class JobBountyEntity extends BaseEntity {
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

  @Expose({ name: 'bounty' })
  @IsNotEmpty()
  @IsInt()
  bounty!: number;

  @Expose({ name: 'bounty_variation' })
  @IsOptional()
  @IsInt()
  bountyVariation?: number;

  @Expose({ name: 'bounty_currency' })
  @IsNotEmpty()
  @IsString()
  bountyCurrency!: string;

  @Expose({ name: 'percentage_bounty_variation' })
  @IsOptional()
  @IsInt()
  percentageBountyVariation?: number;

  @Expose({ name: 'bounty_expiration' })
  @IsNotEmpty()
  @IsDate()
  bountyExpiration!: Date;

  @Expose({ name: 'is_active' })
  @IsNotEmpty()
  isActive!: unknown;

  @Expose({ name: 'hot_bounty' })
  @IsNotEmpty()
  hotBounty!: unknown;

  @Expose({ name: 'company_highlight' })
  @IsNotEmpty()
  @IsString()
  companyHighlight!: string;

  @Expose({ name: 'company_highlight_vi' })
  @IsNotEmpty()
  @IsString()
  companyHighlightVi!: string;

  @Expose({ name: 'sc_in_charge' })
  @IsOptional()
  @IsString()
  scInCharge?: string;

  @Expose({ name: 'ti_in_charge' })
  @IsOptional()
  @IsString()
  tiInCharge?: string;

  @Expose({ name: 'tp_in_charge' })
  @IsOptional()
  @IsString()
  tpInCharge?: string;

  @Expose({ name: 'job_id' })
  @IsNotEmpty()
  @IsString()
  jobId!: string;
}

export class JobBountyMapper extends MysqlMapper<JobBountyEntity> {
  toPersistence = (domainModel: JobBountyEntity) => instanceToPlain<JobBountyEntity>(domainModel);
  toDomain = (persistenceModel: any): JobBountyEntity =>
    plainToInstance<JobBountyEntity, any>(JobBountyEntity, persistenceModel);
}
