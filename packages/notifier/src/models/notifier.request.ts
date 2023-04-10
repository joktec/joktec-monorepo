import PushNotifications from 'node-pushnotifications';

export type NotifierRegIds = PushNotifications.RegistrationId[];
export interface NotifierRequest extends PushNotifications.Data {}
