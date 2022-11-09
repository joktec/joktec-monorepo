import { PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterCandidatestatusDto } from './create-recruiter-candidatestatus.dto';

export class UpdateRecruiterCandidatestatusDto extends PartialType(CreateRecruiterCandidatestatusDto) {}
