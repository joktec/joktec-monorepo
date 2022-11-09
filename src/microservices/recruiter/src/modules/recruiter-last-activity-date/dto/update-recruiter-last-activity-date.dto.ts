import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterLastActivityDateDto } from './create-recruiter-last-activity-date.dto';

export class UpdateRecruiterLastActivityDateDto extends PartialType(CreateRecruiterLastActivityDateDto) {}
