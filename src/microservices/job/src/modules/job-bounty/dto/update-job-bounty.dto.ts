import { PartialType } from '@nestjs/mapped-types';
import { CreateJobBountyDto } from './create-job-bounty.dto';

export class UpdateJobBountyDto extends PartialType(CreateJobBountyDto) {}
