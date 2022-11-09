import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterJobjmcreditlogDto } from './create-recruiter-jobjmcreditlog.dto';

export class UpdateRecruiterJobjmcreditlogDto extends PartialType(CreateRecruiterJobjmcreditlogDto) {}
