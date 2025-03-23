import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsTypes } from '@joktec/utils';

export class BaseProviderConfig {
  @IsBoolean()
  @IsOptional()
  enable?: boolean = true;

  @IsNotEmpty()
  @IsString()
  url!: string;

  constructor(props?: Partial<BaseProviderConfig>) {
    Object.assign(this, props);
  }
}

export class AuthAppleProvider extends BaseProviderConfig {
  @IsNotEmpty()
  @IsString()
  audience!: string;

  constructor(props?: Partial<AuthAppleProvider>) {
    super(props);
    Object.assign(this, props);
  }
}

export class AuthProviderConfig {
  @IsOptional()
  @IsTypes(BaseProviderConfig)
  kakao?: BaseProviderConfig;

  @IsOptional()
  @IsTypes(BaseProviderConfig)
  naver?: BaseProviderConfig;

  @IsOptional()
  @IsTypes(BaseProviderConfig)
  facebook?: BaseProviderConfig;

  @IsOptional()
  @IsTypes(BaseProviderConfig)
  google?: BaseProviderConfig;

  @IsOptional()
  @IsTypes(BaseProviderConfig)
  amazon?: BaseProviderConfig;

  @IsOptional()
  @IsTypes(AuthAppleProvider)
  apple?: AuthAppleProvider;

  @IsBoolean()
  @IsOptional()
  firebase?: boolean = true;

  constructor(props?: Partial<AuthProviderConfig>) {
    Object.assign(this, props);
    if (props?.kakao) this.kakao = new BaseProviderConfig(props.kakao);
    if (props?.naver) this.naver = new BaseProviderConfig(props.naver);
    if (props?.google) this.google = new BaseProviderConfig(props.google);
    if (props?.facebook) this.facebook = new BaseProviderConfig(props.facebook);
    if (props?.amazon) this.amazon = new BaseProviderConfig(props.amazon);
    if (props?.apple) this.apple = new AuthAppleProvider(props.apple);
  }
}
