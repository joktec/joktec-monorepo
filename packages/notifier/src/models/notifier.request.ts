import PushNotifications from 'node-pushnotifications';
import webPush from 'web-push';

export type NotifierRegIds = string | webPush.PushSubscription;

export interface NotifierRequestData extends PushNotifications.Data {}

export interface NotifierRequest {
  regIds: NotifierRegIds[];
  data: NotifierRequestData;
}
