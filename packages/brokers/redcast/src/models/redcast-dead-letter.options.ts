export interface RedcastDeadLetterOptions {
  deadLetterQueue: string;
  deadLetterTTL: number;
  queue: string;
  groupId?: string;
  consumerId?: string;
}
