import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerSkillDto } from './create-jobseeker_skill.dto';

export class UpdateJobseekerSkillDto extends PartialType(CreateJobseekerSkillDto) {}
