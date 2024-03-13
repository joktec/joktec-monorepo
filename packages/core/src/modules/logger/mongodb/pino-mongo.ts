import { getWritableStream } from '@burakbey/pino-mongodb';
import { snakeCase } from 'lodash';
import { DestinationStream } from 'pino';
import { PinoMongoConfig } from './pino-mongo.config';

export const createMongoLoggingStream = async (appName: string, cfg: PinoMongoConfig): Promise<DestinationStream> => {
  return await getWritableStream({
    connectionUri: cfg.uri,
    dbName: cfg.database,
    collectionName: cfg.collection || `${snakeCase(appName)}_logs`,
    format: cfg.format,
  });
};
