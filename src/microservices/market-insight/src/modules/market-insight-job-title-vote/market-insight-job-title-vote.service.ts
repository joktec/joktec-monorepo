import { Injectable } from '@nestjs/common';
import { CreateMarketInsightJobTitleVoteDto } from './dto/create-market-insight-job-title-vote.dto';
import { UpdateMarketInsightJobTitleVoteDto } from './dto/update-market-insight-job-title-vote.dto';

@Injectable()
export class MarketInsightJobTitleVoteService {
  create(createMarketInsightJobTitleVoteDto: CreateMarketInsightJobTitleVoteDto) {
    return 'This action adds a new marketInsightJobTitleVote';
  }

  findAll() {
    return `This action returns all marketInsightJobTitleVote`;
  }

  findById(id: number) {
    return `This action returns a #${id} marketInsightJobTitleVote`;
  }

  update(id: number, updateMarketInsightJobTitleVoteDto: UpdateMarketInsightJobTitleVoteDto) {
    return `This action updates a #${id} marketInsightJobTitleVote`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketInsightJobTitleVote`;
  }
}
