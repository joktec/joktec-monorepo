import { IsInt, IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/utils';
import { ClientConfig } from '../../client/client.config';

export class AwsBaseAssumeRoleConfig {
  @IsString()
  @IsOptional()
  arn?: string;

  @IsString()
  @IsOptional()
  sessionName?: string = 'AssumeRoleSession';

  @IsString()
  @IsOptional()
  externalId?: string;

  @IsInt()
  @IsOptional()
  durationSeconds?: number = 3600;

  constructor(props?: Partial<AwsBaseAssumeRoleConfig>) {
    Object.assign(this, props);
  }
}

export class AwsBaseConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  clientName?: string;

  @IsString()
  @IsNotEmpty()
  region?: string = 'ap-southeast-1';

  @IsString()
  @IsOptional()
  accessKey?: string;

  @IsString()
  @IsOptional()
  secretKey?: string;

  @IsString()
  @IsOptional()
  endpoint?: string;

  @IsString()
  @IsOptional()
  sessionToken?: string;

  @IsOptional()
  @IsInt()
  maxRetries?: number = 3;

  @IsOptional()
  @IsTypes(AwsBaseAssumeRoleConfig)
  assumeRole?: AwsBaseAssumeRoleConfig;

  constructor(props: AwsBaseConfig) {
    super(props);
    Object.assign(this, props);
    if (props.assumeRole) {
      this.assumeRole = new AwsBaseAssumeRoleConfig(props.assumeRole);
    }
  }
}
