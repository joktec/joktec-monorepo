import { CloudWatchConfig } from './cloudwatch.config';

const cloudwatch = require('pino-cloudwatch');

export const createCloudWatchStream = (appName: string, cfg: CloudWatchConfig) => {
  const { accessKeyId, secretAccessKey, region } = cfg;
  return cloudwatch({
    interval: 2000,
    aws_access_key_id: accessKeyId,
    aws_secret_access_key: secretAccessKey,
    aws_region: region,
    group: appName,
  });
};
