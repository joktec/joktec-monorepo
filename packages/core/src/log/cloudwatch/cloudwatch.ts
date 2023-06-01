import { CloudWatchConfig } from './cloudwatch.config';
import cloudwatch from 'pino-cloudwatch';
import { DestinationStream } from 'pino';

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
