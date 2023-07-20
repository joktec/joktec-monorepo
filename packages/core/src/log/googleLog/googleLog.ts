import { DestinationStream } from 'pino';
import PinoStackDriver from 'pino-stackdriver';
import { GoogleLogConfig } from './googleLog.config';

export const createGoogleCloudLoggingStream = (appName: string, cfg: GoogleLogConfig): DestinationStream => {
  return PinoStackDriver.createWriteStream({
    credentials: cfg.credentials,
    projectId: cfg.projectId,
    logName: appName,
  });
};
