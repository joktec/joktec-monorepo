import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBountyHistoryDto } from './create-job-bounty-history.dto';

export class UpdateJobBountyHistoryDto extends PartialType(CreateJobBountyHistoryDto) {}
