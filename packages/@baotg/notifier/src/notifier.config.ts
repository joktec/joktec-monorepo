import { ClientConfig, IsNotEmpty, IsOptional, IsString, IsTypes } from '@baotg/core';
import { ApnConfig, FcmConfig, IApnConfig, IFcmConfig, ISnsConfig, SnsConfig } from './configs';
import mergeDeep from 'merge-deep';

export enum NotifierServiceType {
  FCM = 'fcm',
  SNS = 'sns',
  APN = 'apn',
  ADM = 'adm',
  WNS = 'wns',
  MPNS = 'mpns',
  WEB = 'web',
}

export class NotifierConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  service!: NotifierServiceType;

  @IsTypes([FcmConfig, SnsConfig, ApnConfig])
  @IsOptional()
  credential!: IFcmConfig | ISnsConfig | IApnConfig;

  constructor(props: NotifierConfig) {
    super(props);
    mergeDeep(this, {
      ...props,
      service: props.service || NotifierServiceType.FCM,
    });
  }
}
