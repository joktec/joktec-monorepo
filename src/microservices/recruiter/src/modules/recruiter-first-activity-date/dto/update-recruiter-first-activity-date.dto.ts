import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterFirstActivityDateDto } from './create-recruiter-first-activity-date.dto';

export class UpdateRecruiterFirstActivityDateDto extends PartialType(CreateRecruiterFirstActivityDateDto) {}
