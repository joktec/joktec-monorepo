export interface NotifierError {
  code?: string;
  message?: string;
  stack?: string;
  data?: any;
}

export interface NotifierMessage {
  regId: string;
  originalRegId?: string;
  messageId?: string;
  error?: NotifierError | null;
}

export interface NotifierResult {
  method: string;
  success: number;
  failure: number;
  messages: NotifierMessage[];
}

export interface NotifierTopicResponse {
  messageId: number | string;
}
