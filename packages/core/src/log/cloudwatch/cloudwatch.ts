import { DestinationStream } from 'pino';
import cloudwatch from 'pino-cloudwatch';
import { CloudWatchConfig } from './cloudwatch.config';

export const createCloudWatchStream = (appName: string, cfg: CloudWatchConfig): DestinationStream => {
  const { accessKeyId, secretAccessKey, region } = cfg;
  return cloudwatch({
    interval: 2000,
    aws_access_key_id: accessKeyId,
    aws_secret_access_key: secretAccessKey,
    aws_region: region,
    group: appName,
  });
};
