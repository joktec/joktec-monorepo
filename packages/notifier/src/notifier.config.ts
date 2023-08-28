import { ClientConfig, toBool } from '@joktec/core';
import mergeDeep from 'merge-deep';
import PushNotifications from 'node-pushnotifications';
// import webPush from 'web-push';

export class NotifierConfig extends ClientConfig implements PushNotifications.Settings {
  gcm?: {
    id?: string;
  };
  apn?: {
    token?: {
      key?: Buffer | string;
      keyId?: string;
      teamId?: string;
    };
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
  };
  adm?: {
    client_id?: string;
    client_secret?: string;
  };
  wns?: {
    client_id?: string;
    client_secret?: string;
    accessToken?: string;
    headers?: string;
    notificationMethod?: string;
  };
  mpns?: {
    options?: {
      client_id?: string;
      client_secret?: string;
    };
  };
  // web?: webPush.RequestOptions;
  isAlwaysUseFCM!: boolean;

  constructor(props: NotifierConfig) {
    super(props);
    mergeDeep(this, {
      ...props,
      isAlwaysUseFCM: toBool(props.isAlwaysUseFCM, true),
    });
  }
}
