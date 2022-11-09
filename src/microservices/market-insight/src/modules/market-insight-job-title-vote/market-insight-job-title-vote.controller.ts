import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketInsightJobTitleVoteService } from './market-insight-job-title-vote.service';
import { CreateMarketInsightJobTitleVoteDto } from './dto/create-market-insight-job-title-vote.dto';
import { UpdateMarketInsightJobTitleVoteDto } from './dto/update-market-insight-job-title-vote.dto';

@Controller('market-insight-job-title-vote')
export class MarketInsightJobTitleVoteController {
  constructor(private readonly marketInsightJobTitleVoteService: MarketInsightJobTitleVoteService) {}

  @Post()
  create(@Body() createMarketInsightJobTitleVoteDto: CreateMarketInsightJobTitleVoteDto) {
    return this.marketInsightJobTitleVoteService.create(createMarketInsightJobTitleVoteDto);
  }

  @Get()
  findAll() {
    return this.marketInsightJobTitleVoteService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.marketInsightJobTitleVoteService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketInsightJobTitleVoteDto: UpdateMarketInsightJobTitleVoteDto) {
    return this.marketInsightJobTitleVoteService.update(+id, updateMarketInsightJobTitleVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketInsightJobTitleVoteService.remove(+id);
  }
}
