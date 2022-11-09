import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketInsightJobTitleDto } from './create-market-insight-job-title.dto';

export class UpdateMarketInsightJobTitleDto extends PartialType(CreateMarketInsightJobTitleDto) {}
