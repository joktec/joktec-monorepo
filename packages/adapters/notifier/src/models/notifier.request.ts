import PushNotifications from 'node-pushnotifications';
import { PushSubscription } from 'web-push';

export interface NotifierWebPushSubscription extends PushSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export type NotifierRegIds = string | NotifierWebPushSubscription;

export interface NotifierRequestData extends PushNotifications.Data {
  /** REQUIRED */
  title: string;
  /** REQUIRED */
  body: string;
  /** Data */
  custom?: { [key: string]: string | number } | string;
  /** gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high' */
  priority?: string;
  /** gcm for android, used as collapseId in apn */
  collapseKey?: string;
  /** gcm for android */
  contentAvailable?: boolean | string;
  /** gcm for android */
  delayWhileIdle?: boolean;
  /** gcm for android */
  restrictedPackageName?: string;
  /** gcm for android */
  dryRun?: boolean;
  /** gcm for android */
  icon?: string;
  /** gcm for android */
  tag?: string;
  /** gcm for android */
  color?: string;
  /** gcm for android. In ios, category will be used if not supplied */
  clickAction?: string;
  /** gcm, apn */
  locKey?: string;
  /** gcm, apn */
  bodyLocArgs?: string;
  /** gcm, apn */
  titleLocKey?: string;
  /** gcm, apn */
  titleLocArgs?: string;
  /** gcm, apn */
  retries?: number;
  /** apn */
  encoding?: string;
  /** gcm for ios, apn */
  badge?: number;
  /** gcm, apn */
  sound?: string;
  /** apn, will take precedence over title and body. It is also accepted a text message in alert */
  alert?: {} | string;
  /** apn and gcm for ios */
  launchImage?: string;
  /** apn and gcm for ios */
  action?: string;
  /** apn and gcm for ios */
  topic?: string;
  /** apn and gcm for ios */
  category?: string;
  /** apn and gcm for ios */
  mdm?: string;
  /** apn and gcm for ios */
  urlArgs?: string;
  /** apn and gcm for ios */
  truncateAtWordEnd?: boolean;
  /** apn */
  mutableContent?: number;
  /** seconds */
  expiry?: number;
  /** if both expiry and timeToLive are given, expiry will take precedency */
  timeToLive?: number;
  /** wns */
  headers?: string[];
  /** wns */
  launch?: string;
  /** wns */
  duration?: string;
  /** ADM */
  consolidationKey?: string;
}

export interface NotifierRequest {
  regIds: NotifierRegIds[];
  data: NotifierRequestData;
}
