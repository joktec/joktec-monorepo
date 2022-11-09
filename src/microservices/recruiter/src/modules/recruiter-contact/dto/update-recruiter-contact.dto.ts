import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterContactDto } from './create-recruiter-contact.dto';

export class UpdateRecruiterContactDto extends PartialType(CreateRecruiterContactDto) {}
