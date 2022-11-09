import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketInsightJobTitleService } from './market-insight-job-title.service';
import { CreateMarketInsightJobTitleDto } from './dto/create-market-insight-job-title.dto';
import { UpdateMarketInsightJobTitleDto } from './dto/update-market-insight-job-title.dto';

@Controller('market-insight-job-title')
export class MarketInsightJobTitleController {
  constructor(private readonly marketInsightJobTitleService: MarketInsightJobTitleService) {}

  @Post()
  create(@Body() createMarketInsightJobTitleDto: CreateMarketInsightJobTitleDto) {
    return this.marketInsightJobTitleService.create(createMarketInsightJobTitleDto);
  }

  @Get()
  findAll() {
    return this.marketInsightJobTitleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.marketInsightJobTitleService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketInsightJobTitleDto: UpdateMarketInsightJobTitleDto) {
    return this.marketInsightJobTitleService.update(+id, updateMarketInsightJobTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketInsightJobTitleService.remove(+id);
  }
}
