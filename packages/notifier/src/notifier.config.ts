import { ClientConfig, IsTypes } from '@joktec/core';
import { IsBoolean, IsOptional } from '@joktec/utils';
import { NotifierAdm, NotifierApn, NotifierFcm, NotifierGcm, NotifierMpns, NotifierWns } from './configs';

export class NotifierConfig extends ClientConfig {
  @IsOptional()
  @IsTypes(NotifierFcm)
  fcm?: NotifierFcm;

  @IsOptional()
  @IsTypes(NotifierGcm)
  gcm?: NotifierGcm;

  @IsOptional()
  @IsTypes(NotifierApn)
  apn?: NotifierApn;

  @IsOptional()
  @IsTypes(NotifierAdm)
  adm?: NotifierAdm;

  @IsOptional()
  @IsTypes(NotifierWns)
  wns?: NotifierWns;

  @IsOptional()
  @IsTypes(NotifierMpns)
  mpns?: NotifierMpns;

  @IsOptional()
  @IsBoolean()
  isAlwaysUseFCM?: boolean = true;

  constructor(props: NotifierConfig) {
    super(props);
    Object.assign(this, props);
    if (props?.fcm) this.fcm = new NotifierFcm(props.fcm);
    if (props?.gcm) this.gcm = new NotifierGcm(props.gcm);
    if (props?.apn) this.apn = new NotifierApn(props.apn);
    if (props?.adm) this.adm = new NotifierAdm(props.adm);
    if (props?.wns) this.wns = new NotifierWns(props.wns);
    if (props?.mpns) this.mpns = new NotifierMpns(props.mpns);
  }
}
