import { PartialType } from '@nestjs/mapped-types';
import { CreateJobhopSuggestedKeywordDto } from './create-jobhop-suggestedkeyword.dto';

export class UpdateJobhopSuggestedKeywordDto extends PartialType(CreateJobhopSuggestedKeywordDto) {}
