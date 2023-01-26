import {
  BaseMethodDecorator,
  CallbackDecoratorOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@baotg/core';
import { StorageConfig } from './storage.config';
import { StorageDownloadResponse, StorageUploadResponse } from './models';

export const TRACK_STATUS_STORAGE_METRIC = 'track_status_storage_metric';

export enum UploadStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum DownloadStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum StorageMetricType {
  UPLOAD = 'UPLOAD',
  DOWNLOAD = 'DOWNLOAD',
}

@Injectable()
export class StorageMetricService {
  constructor(@InjectMetric(TRACK_STATUS_STORAGE_METRIC) private trackMetric: Counter<string>) {}

  track(
    type: StorageMetricType,
    status: UploadStatus | DownloadStatus,
    bucket: string,
    conId: string = DEFAULT_CON_ID,
  ) {
    this.trackMetric.inc({ type, status, bucket, conId });
  }
}

export const DownloadRedisMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services } = options;
      const [req, conId = DEFAULT_CON_ID] = args;
      const storageMetricService: StorageMetricService = services.storageMetricService;
      const bucket = req.bucket || services.configService.get<StorageConfig>('storage').bucket;

      try {
        const value: StorageDownloadResponse = await method(...args);
        const { key } = value;
        services.pinoLogger.debug('`%s` Storage download file `%s` in bucket `%s` success', conId, key, bucket);
        storageMetricService.track(StorageMetricType.DOWNLOAD, DownloadStatus.SUCCESS, bucket, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(
          error,
          '`%s` Storage download file `%s` in bucket `%s` failed',
          conId,
          req.key,
          bucket,
        );
        storageMetricService.track(StorageMetricType.DOWNLOAD, DownloadStatus.ERROR, bucket, conId);
      }
    },
    [StorageMetricService],
  );
};

export const UploadRedisMetric = () => {
  return BaseMethodDecorator(
    async (options: CallbackDecoratorOptions): Promise<any> => {
      const { method, args, services } = options;
      const [req, conId = DEFAULT_CON_ID] = args;
      const storageMetricService: StorageMetricService = services.storageMetricService;
      const bucket = req.bucket || services.configService.get<StorageConfig>('storage').bucket;

      try {
        const value: StorageUploadResponse = await method(...args);
        const { key } = value;
        services.pinoLogger.debug('`%s` Storage upload file `%s` in bucket `%s` success', conId, key, bucket);
        storageMetricService.track(StorageMetricType.UPLOAD, UploadStatus.SUCCESS, req.bucket, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` Storage upload file `%s` in bucket `%s` failed', conId, req.key, bucket);
        storageMetricService.track(StorageMetricType.UPLOAD, UploadStatus.ERROR, req.bucket, conId);
      }
    },
    [StorageMetricService],
  );
};
