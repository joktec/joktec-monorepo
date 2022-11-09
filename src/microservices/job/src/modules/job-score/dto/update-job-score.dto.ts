import { PartialType } from '@nestjs/mapped-types';
import { CreateJobScoreDto } from './create-job-score.dto';

export class UpdateJobScoreDto extends PartialType(CreateJobScoreDto) {}
