import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterCandidatestatusmessageDto } from './create-recruiter-candidatestatusmessage.dto';

export class UpdateRecruiterCandidatestatusmessageDto extends PartialType(CreateRecruiterCandidatestatusmessageDto) {}
