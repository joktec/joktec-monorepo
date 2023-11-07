import { BullConfig, GatewayConfig, JwtConfig, LogConfig, MicroConfig } from '@joktec/core';
import { MongoConfig } from '@joktec/mongo';

export type JoktecConfig = {
  gateway?: GatewayConfig;
  micro?: MicroConfig;
  log?: LogConfig;
  bull?: BullConfig;
  guard?: JwtConfig;
  mongo?: MongoConfig;
  // storage?: StorageConfig;
  // http?: HttpConfig;
  // mailer?: MailerConfig;
  // firebase?: FirebaseConfig;
  // misc?: Record<string, any>;
};
