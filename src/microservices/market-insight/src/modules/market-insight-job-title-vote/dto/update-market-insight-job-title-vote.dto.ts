import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketInsightJobTitleVoteDto } from './create-market-insight-job-title-vote.dto';

export class UpdateMarketInsightJobTitleVoteDto extends PartialType(CreateMarketInsightJobTitleVoteDto) {}
