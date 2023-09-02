import { isString } from 'lodash';
import { DestinationStream } from 'pino';
import PinoStackDriver from 'pino-stackdriver';
import { GoogleLogConfig } from './googleLog.config';

export const createGoogleLoggingStream = (appName: string, cfg: GoogleLogConfig): DestinationStream => {
  return PinoStackDriver.createWriteStream({
    credentials: isString(cfg.credential)
      ? cfg.credential
      : {
          client_email: cfg.credential?.clientEmail,
          private_key: cfg.credential?.privateKey,
        },
    projectId: cfg.projectId,
    logName: appName,
  });
};
