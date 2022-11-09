import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterJobjmcreditplanDto } from './create-recruiter-jobjmcreditplan.dto';

export class UpdateRecruiterJobjmcreditplanDto extends PartialType(CreateRecruiterJobjmcreditplanDto) {}
