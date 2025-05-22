import { AwsBaseAssumeRoleConfig, AwsBaseConfig } from '@joktec/core';
import { IsBoolean, IsInt, IsOptional, IsTypes, toBool, toInt } from '@joktec/utils';

export class SqsAssumeRoleConfig extends AwsBaseAssumeRoleConfig {
  constructor(props?: Partial<SqsAssumeRoleConfig>) {
    super(props);
    Object.assign(this, props);
  }
}

export class SqsConfig extends AwsBaseConfig {
  @IsOptional()
  @IsBoolean()
  sslEnabled?: boolean;

  @IsOptional()
  @IsInt()
  timeout?: number;

  @IsOptional()
  @IsBoolean()
  ping?: boolean;

  @IsOptional()
  @IsTypes(SqsAssumeRoleConfig)
  assumeRole?: SqsAssumeRoleConfig;

  constructor(props?: SqsConfig) {
    super(props);
    Object.assign(this, {
      clientName: 'SQS',
      sslEnabled: toBool(props.sslEnabled, true),
      timeout: toInt(props.timeout, 30000),
      ...props,
    });
    if (props.assumeRole) this.assumeRole = new SqsAssumeRoleConfig(props.assumeRole);
  }
}
