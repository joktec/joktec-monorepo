export enum NotifierPriority {
  HIGH = 'high',
  NORMAL = 'normal',
}

export interface NotifierOption {
  /** gcm for android */
  dryRun?: boolean;
  /** gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high' */
  priority?: NotifierPriority;
  /** if both expiry and timeToLive are given, expiry will take precedency */
  timeToLive?: number;
  /** gcm for android, used as collapseId in apn */
  collapseKey?: string;
  /** apn */
  mutableContent?: boolean;
  /** gcm for android */
  contentAvailable?: boolean | string;
  /** gcm for android */
  restrictedPackageName?: string;
  /** The UNIX timestamp representing when the notification should expire. This does not contribute to the 2048 byte payload size limit. An expiry of 0 indicates that the notification expires immediately. */
  expiry?: number;
}

export interface NotifierPayload {
  /** REQUIRED */
  title: string;
  /** REQUIRED */
  body: string;
  /** gcm for android */
  delayWhileIdle?: boolean;
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
  /** fcm */
  bodyLocKey?: string;
  /** gcm, apn */
  titleLocKey?: string;
  /** gcm, apn */
  titleLocArgs?: string;
  /** gcm, apn */
  retries?: number;
  /** apn */
  encoding?: string;
  /** gcm for ios, apn */
  badge?: string;
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
  /** seconds */
  expiry?: number;
  /** wns */
  headers?: string[];
  /** wns */
  launch?: string;
  /** wns */
  duration?: string;
  /** ADM */
  consolidationKey?: string;
  custom?: { [key: string]: string | number } | string;
}

export interface NotifierRequest {
  data?: { [key: string]: any };
  notification: NotifierPayload;
  option?: NotifierOption;
}
