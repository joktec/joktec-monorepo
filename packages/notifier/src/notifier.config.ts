import { ClientConfig, IsOptional, IsTypes, IsString, IsBoolean } from '@joktec/core';

export class NotifierGcm {
  id?: string;

  constructor(props: NotifierGcm) {
    Object.assign(this, props);
  }
}

export class NotifierApnToken {
  @IsOptional()
  @IsTypes([Buffer, String])
  key?: Buffer | string;

  @IsOptional()
  @IsString()
  keyId?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  constructor(props: NotifierApnToken) {
    Object.assign(this, props);
  }
}

export class NotifierApn {
  @IsOptional()
  @IsTypes([NotifierApnToken])
  token?: NotifierApnToken;

  cert?: string;
  key?: string;
  ca?: Array<Buffer | string>;
  pfx?: Buffer | string;
  passphrase?: string;
  production?: boolean;
  voip?: boolean;
  address?: string;
  port?: number;
  rejectUnauthorized?: boolean;
  connectionRetryLimit?: number;
  cacheLength?: number;
  connectionTimeout?: number;
  autoAdjustCache?: boolean;
  maxConnections?: number;
  minConnections?: number;
  connectTimeout?: number;
  buffersNotifications?: boolean;
  fastMode?: boolean;
  disableNagle?: boolean;
  disableEPIPEFix?: boolean;

  constructor(props: NotifierApn) {
    Object.assign(this, props);
    if (props?.token) this.token = new NotifierApnToken(props.token);
  }
}

export class NotifierAdm {
  client_id?: string;
  client_secret?: string;

  constructor(props: NotifierAdm) {
    Object.assign(this, props);
  }
}

export class NotifierWns {
  client_id?: string;
  client_secret?: string;
  accessToken?: string;
  headers?: string;
  notificationMethod?: string;

  constructor(props: NotifierWns) {
    Object.assign(this, props);
  }
}

export class NotifierMpns {
  options?: {
    client_id?: string;
    client_secret?: string;
  };

  constructor(props: NotifierMpns) {
    Object.assign(this, props);
  }
}

export class NotifierConfig extends ClientConfig {
  @IsOptional()
  @IsTypes([NotifierGcm])
  gcm?: NotifierGcm;

  @IsOptional()
  @IsTypes([NotifierApn])
  apn?: NotifierApn;

  @IsOptional()
  @IsTypes([NotifierAdm])
  adm?: NotifierAdm;

  @IsOptional()
  @IsTypes([NotifierWns])
  wns?: NotifierWns;

  @IsOptional()
  @IsTypes([NotifierMpns])
  mpns?: NotifierMpns;

  @IsOptional()
  @IsBoolean()
  isAlwaysUseFCM?: boolean = true;

  constructor(props: NotifierConfig) {
    super(props);
    Object.assign(this, props);
    if (props?.gcm) this.gcm = new NotifierGcm(props.gcm);
    if (props?.apn) this.apn = new NotifierApn(props.apn);
    if (props?.adm) this.adm = new NotifierAdm(props.adm);
    if (props?.wns) this.wns = new NotifierWns(props.wns);
    if (props?.mpns) this.mpns = new NotifierMpns(props.mpns);
  }
}
