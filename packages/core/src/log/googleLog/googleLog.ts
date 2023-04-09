import { GoogleLogConfig } from './googleLog.config';

const stackdriver = require('pino-stackdriver');

export const createGoogleCloudLoggingStream = (appName: string, cfg: GoogleLogConfig) => {
  const writeStream = stackdriver.createWriteStream({
    credentials: cfg.credentials,
    projectId: cfg.projectId,
    logName: appName,
  });
  return { stream: writeStream };
};
