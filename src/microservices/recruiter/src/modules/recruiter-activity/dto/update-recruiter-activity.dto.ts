import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterActivityDto } from './create-recruiter-activity.dto';

export class UpdateRecruiterActivityDto extends PartialType(CreateRecruiterActivityDto) {}
