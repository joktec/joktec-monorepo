import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterJobjmcreditDto } from './create-recruiter-jobjmcredit.dto';

export class UpdateRecruiterJobjmcreditDto extends PartialType(CreateRecruiterJobjmcreditDto) {}
