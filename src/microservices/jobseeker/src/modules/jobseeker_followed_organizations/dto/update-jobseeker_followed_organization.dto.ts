import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerFollowedOrganizationDto } from './create-jobseeker_followed_organization.dto';

export class UpdateJobseekerFollowedOrganizationDto extends PartialType(CreateJobseekerFollowedOrganizationDto) {}
