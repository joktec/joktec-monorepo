import PushNotifications, { Message, MethodValue } from 'node-pushnotifications';

export interface NotifierResponse extends PushNotifications.Result {
  method: MethodValue;
  success: number;
  failure: number;
  message: Message[];
}
