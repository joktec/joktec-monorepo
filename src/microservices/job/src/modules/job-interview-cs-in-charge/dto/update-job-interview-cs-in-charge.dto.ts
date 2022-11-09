import { PartialType } from '@nestjs/mapped-types';
import { CreateJobInterviewCsInChargeDto } from './create-job-interview-cs-in-charge.dto';

export class UpdateJobInterviewCsInChargeDto extends PartialType(CreateJobInterviewCsInChargeDto) {}
