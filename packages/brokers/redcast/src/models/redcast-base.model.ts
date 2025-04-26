export interface RedcastMessage {
  message: string;
  channel?: string;
  pattern?: string;
  queue?: string;
}

export interface RedcastDeadLetterOptions {
  deadLetterQueue: string;
  deadLetterTTL: number;
  queue: string;
  groupId?: string;
  consumerId?: string;
}
