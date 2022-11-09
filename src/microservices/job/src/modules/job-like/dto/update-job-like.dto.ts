import { PartialType } from '@nestjs/mapped-types';
import { CreateJobLikeDto } from './create-job-like.dto';

export class UpdateJobLikeDto extends PartialType(CreateJobLikeDto) {}
