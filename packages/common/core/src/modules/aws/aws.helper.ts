import { fromIni, fromTemporaryCredentials } from '@aws-sdk/credential-providers';
import { PinoLogger } from 'nestjs-pino';
import { DEFAULT_CON_ID } from '../../client/client.config';
import { AwsBaseConfig } from './aws.config';

export const bindingAwsLogger = (logger: PinoLogger, clientName: string, conId: string = DEFAULT_CON_ID) => {
  const log =
    (method: 'trace' | 'debug' | 'info' | 'warn' | 'error') =>
    (...args: any[]) => {
      for (const arg of args) {
        if (typeof arg === 'string') {
          logger[method]('`%s` %s client - %s', conId, clientName, arg);
          continue;
        }
        const isSkipMethod = method === 'trace' || method === 'debug' || method === 'info';
        if (isSkipMethod && arg.commandName === 'ReceiveMessageCommand') continue;
        logger[method](arg, '`%s` %s client command %s', conId, clientName, arg.commandName);
      }
    };

  return {
    trace: log('trace'),
    debug: log('debug'),
    info: log('info'),
    warn: log('warn'),
    error: log('error'),
  };
};

export const getAwsCredentials = (awsConfig: AwsBaseConfig): any => {
  const { region, endpoint, accessKey, secretKey, sessionToken, assumeRole } = awsConfig;

  const baseCredentials =
    !accessKey || !secretKey ? fromIni() : { accessKeyId: accessKey, secretAccessKey: secretKey, sessionToken };

  return !assumeRole
    ? baseCredentials
    : fromTemporaryCredentials({
        masterCredentials: baseCredentials,
        clientConfig: { region, endpoint },
        params: {
          RoleArn: assumeRole.arn,
          RoleSessionName: assumeRole.sessionName,
          ExternalId: assumeRole.externalId,
          DurationSeconds: assumeRole.durationSeconds,
        },
      });
};
