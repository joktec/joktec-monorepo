import {
  BaseMethodDecorator,
  CallbackMethodOptions,
  Counter,
  DEFAULT_CON_ID,
  Histogram,
  Injectable,
  InjectMetric,
} from '@joktec/core';

export const FILE_TRACK_STATUS_METRIC: string = 'file_track_status_metric';
export const FILE_DURATION_METRIC: string = 'file_duration_metric';

@Injectable()
export class FileMetricService {
  constructor(
    @InjectMetric(FILE_TRACK_STATUS_METRIC) private trackMetric: Counter<string>,
    @InjectMetric(FILE_DURATION_METRIC) private durationMetric: Histogram<string>,
  ) {}

  trackStatus(type: string, status: 'ERROR' | 'SUCCESS', conId: string = DEFAULT_CON_ID) {
    this.trackMetric.inc({ type, status, conId });
  }

  duration(type: string, conId: string = DEFAULT_CON_ID) {
    return this.durationMetric.startTimer({ type, conId });
  }
}

export const FileMetric = () =>
  BaseMethodDecorator(
    async function (options: CallbackMethodOptions): Promise<any> {
      const { method, args, services, propertyKey } = options;
      const type = propertyKey as string;
      const conId = args[3] ?? DEFAULT_CON_ID;
      const fileMetricService: FileMetricService = services.fileMetricService;

      const duration = fileMetricService.duration(type, conId);
      try {
        const response = await method(...args);
        duration();
        fileMetricService.trackStatus(type, 'SUCCESS', conId);
        return response;
      } catch (error) {
        duration();
        fileMetricService.trackStatus(type, 'ERROR', conId);
        services.pinoLogger.error(error, '`%s` file %s error', conId, type);
        throw error;
      }
    },
    [FileMetricService],
  );
