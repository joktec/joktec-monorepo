import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerCareerInterestCardDto } from './create-jobseeker_career_interest_card.dto';

export class UpdateJobseekerCareerInterestCardDto extends PartialType(CreateJobseekerCareerInterestCardDto) {}
