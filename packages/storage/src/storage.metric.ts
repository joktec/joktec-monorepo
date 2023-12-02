import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Injectable,
  InjectMetric,
} from '@joktec/core';
import { StorageConfig } from './storage.config';

export const TRACK_STATUS_STORAGE_METRIC = 'track_status_storage_metric';

export enum StorageMetricStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum StorageMetricType {
  UPLOAD = 'UPLOAD',
  DOWNLOAD = 'DOWNLOAD',
  PRESIGNED = 'PRESIGNED',
}

@Injectable()
export class StorageMetricService {
  constructor(@InjectMetric(TRACK_STATUS_STORAGE_METRIC) private trackMetric: Counter<string>) {}

  track(
    type: StorageMetricType | string,
    status: StorageMetricStatus | string,
    bucket: string,
    conId: string = DEFAULT_CON_ID,
  ) {
    this.trackMetric.inc({ type, status, bucket, conId });
  }
}

export const StorageMetric = (action: StorageMetricType | string) => {
  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<any> => {
      const { method, args, services } = options;
      const [req, conId = DEFAULT_CON_ID] = args;
      const storageMetricService: StorageMetricService = services.storageMetricService;
      const bucket = req.bucket || services.configService.get<StorageConfig>('storage').bucket;

      try {
        const value: any = await method(...args);
        const { key } = value;
        services.pinoLogger.debug('`%s` Storage %s file `%s` in bucket `%s` success', conId, action, key, bucket);
        storageMetricService.track(action, StorageMetricStatus.SUCCESS, bucket, conId);
        return value;
      } catch (error) {
        services.pinoLogger.error(
          error,
          '`%s` Storage %s file `%s` in bucket `%s` failed',
          conId,
          action,
          req.key,
          bucket,
        );
        storageMetricService.track(action, StorageMetricStatus.ERROR, bucket, conId);
      }
    },
    [StorageMetricService],
  );
};
