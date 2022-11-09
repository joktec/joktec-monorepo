import { PartialType } from '@nestjs/mapped-types';
import { CreateJobInterviewHistoryDto } from './create-jobinterview-history.dto';

export class UpdateJobInterviewHistoryDto extends PartialType(CreateJobInterviewHistoryDto) {}
