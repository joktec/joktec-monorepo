import { PartialType } from '@nestjs/mapped-types';
import { CreateJobSubscriptionHistoryDto } from './create-job-subscription-history.dto';

export class UpdateJobSubscriptionHistoryDto extends PartialType(CreateJobSubscriptionHistoryDto) {}
