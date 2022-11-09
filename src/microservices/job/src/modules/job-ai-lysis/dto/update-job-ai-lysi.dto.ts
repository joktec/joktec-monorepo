import { PartialType } from '@nestjs/mapped-types';
import { CreateJobAiLysiDto } from './create-job-ai-lysi.dto';

export class UpdateJobAiLysiDto extends PartialType(CreateJobAiLysiDto) {}
