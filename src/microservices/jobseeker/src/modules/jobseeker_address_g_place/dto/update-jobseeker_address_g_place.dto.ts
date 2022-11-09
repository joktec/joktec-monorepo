import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerAddressGPlaceDto } from './create-jobseeker_address_g_place.dto';

export class UpdateJobseekerAddressGPlaceDto extends PartialType(CreateJobseekerAddressGPlaceDto) {}
