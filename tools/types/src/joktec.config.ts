import { AlertConfig } from '@joktec/alert';
import { ArangoConfig } from '@joktec/arango';
import { BigQueryConfig } from '@joktec/bigquery';
import { CacheConfig } from '@joktec/cacher';
import { BullConfig, GatewayConfig, JwtConfig, LogConfig, MicroConfig } from '@joktec/core';
import { ElasticConfig } from '@joktec/elastic';
import { FileConfig } from '@joktec/file';
import { FirebaseConfig } from '@joktec/firebase';
import { HttpConfig } from '@joktec/http';
import { KafkaConfig } from '@joktec/kafka';
import { MailerConfig } from '@joktec/mailer';
import { MongoConfig } from '@joktec/mongo';
import { MysqlConfig } from '@joktec/mysql';
import { NotifierConfig } from '@joktec/notifier';
import { RabbitConfig } from '@joktec/rabbit';
import { StorageConfig } from '@joktec/storage';

export type JoktecConfig = {
  // Core
  gateway?: GatewayConfig;
  micro?: MicroConfig;
  log?: LogConfig;
  bull?: BullConfig;
  guard?: JwtConfig;
  // Client
  alert?: AlertConfig;
  arango?: ArangoConfig;
  bigquery?: BigQueryConfig;
  cacher?: CacheConfig;
  elastic?: ElasticConfig;
  file?: FileConfig;
  firebase?: FirebaseConfig;
  http?: HttpConfig;
  kafka?: KafkaConfig;
  mailer?: MailerConfig;
  mongo?: MongoConfig;
  mysql?: MysqlConfig;
  notifier?: NotifierConfig;
  rabbit?: RabbitConfig;
  storage?: StorageConfig;
  // Misc
  misc?: Record<string, any>;
};
