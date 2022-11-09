import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterDto } from './create-recruiter.dto';

export class UpdateRecruiterDto extends PartialType(CreateRecruiterDto) {}
