import { fromIni, fromTemporaryCredentials } from '@aws-sdk/credential-providers';
import { Logger } from '@smithy/types';
import { PinoLogger } from 'nestjs-pino';
import { DEFAULT_CON_ID } from '../../client/client.config';
import { AwsBaseConfig } from './aws.config';

export const bindingAwsLogger = (logger: PinoLogger, config: AwsBaseConfig): Logger => {
  const { debug, clientName, conId = DEFAULT_CON_ID } = config;
  const log =
    (method: 'trace' | 'debug' | 'info' | 'warn' | 'error') =>
    (...args: any[]) => {
      for (const arg of args) {
        if (typeof arg === 'string') {
          debug && logger[method]('`%s` %s client - %s', conId, clientName, arg);
          continue;
        }
        const isSkipMethod = method === 'trace' || method === 'debug' || method === 'info';
        if (isSkipMethod && arg.commandName === 'ReceiveMessageCommand') continue;
        debug && logger[method](arg, '`%s` %s client command %s', conId, clientName, arg.commandName);
      }
    };

  return { trace: log('trace'), debug: log('debug'), info: log('info'), warn: log('warn'), error: log('error') };
};

export const getAwsCredentials = (awsConfig: AwsBaseConfig, awsLogger?: Logger): any => {
  const { region, accessKey, secretKey, sessionToken, assumeRole, fromIni: useIniProfile } = awsConfig;

  const baseCredentials =
    accessKey && secretKey
      ? { accessKeyId: accessKey, secretAccessKey: secretKey, sessionToken }
      : useIniProfile
        ? fromIni({ logger: awsLogger })
        : undefined;

  if (!assumeRole) return baseCredentials ?? undefined;
  const { arn, sessionName, externalId, durationSeconds } = assumeRole;
  return fromTemporaryCredentials({
    masterCredentials: baseCredentials,
    clientConfig: { region },
    params: { RoleArn: arn, RoleSessionName: sessionName, ExternalId: externalId, DurationSeconds: durationSeconds },
    logger: awsLogger,
  });
};
