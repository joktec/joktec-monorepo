import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import badMutable from 'dayjs/plugin/badMutable';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advancedFormat);
dayjs.extend(badMutable);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(timezone);
dayjs.extend(utc);

export * from './crontabs';
export * from './jobs';
export { ScheduleModule, SchedulerRegistry, Timeout, Interval, CronExpression } from '@nestjs/schedule';
export {
  CronJob,
  CronTime,
  CronJobParams,
  CronCallback,
  CronCommand,
  CronContext,
  CronOnCompleteCallback,
  CronOnCompleteCommand,
} from 'cron';
