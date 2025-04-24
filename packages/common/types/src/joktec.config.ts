import { AlertConfig } from '@joktec/alert';
import { ArangoConfig } from '@joktec/arango';
import { BigQueryConfig } from '@joktec/bigquery';
import { CacheConfig } from '@joktec/cacher';
import { BullConfig, GatewayConfig, JwtConfig, Listable, LogConfig, MicroConfig, Transporter } from '@joktec/core';
import { CrontabConfig } from '@joktec/cron';
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
import { RedcastConfig } from '@joktec/redcast';
import { SqsConfig } from '@joktec/sqs/src';
import { StorageConfig } from '@joktec/storage';

export type JoktecConfig = {
  // Core
  gateway?: GatewayConfig;
  micro?: MicroConfig;
  transports?: Transporter[];
  log?: LogConfig;
  bull?: BullConfig;
  guard?: JwtConfig;
  // Client
  alert?: Listable<AlertConfig>;
  arango?: Listable<ArangoConfig>;
  bigquery?: Listable<BigQueryConfig>;
  cacher?: Listable<CacheConfig>;
  elastic?: Listable<ElasticConfig>;
  file?: Listable<FileConfig>;
  firebase?: Listable<FirebaseConfig>;
  http?: Listable<HttpConfig>;
  kafka?: Listable<KafkaConfig>;
  mailer?: Listable<MailerConfig>;
  mongo?: Listable<MongoConfig>;
  mysql?: Listable<MysqlConfig>;
  notifier?: Listable<NotifierConfig>;
  rabbit?: Listable<RabbitConfig>;
  redcast?: Listable<RedcastConfig>;
  storage?: Listable<StorageConfig>;
  sqs?: Listable<SqsConfig>;
  crontab?: Listable<CrontabConfig>;
  // Misc
  misc?: Record<string, any>;
};
