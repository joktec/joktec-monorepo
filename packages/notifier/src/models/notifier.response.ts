import PushNotifications, { Message, MethodValue } from 'node-pushnotifications';

export interface NotifierMessage extends Message {
  regId: string;
  originalRegId?: string;
  messageId?: string;
  error?: Error | null;
  errorMsg?: string;
}

export interface NotifierResponse extends PushNotifications.Result {
  method: MethodValue;
  success: number;
  failure: number;
  message: NotifierMessage[];
}
