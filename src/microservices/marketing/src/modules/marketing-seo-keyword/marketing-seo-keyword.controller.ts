import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingSeoKeywordService } from './marketing-seo-keyword.service';
import { CreateMarketingSeoKeywordDto } from './dto/create-marketing-seo-keyword.dto';
import { UpdateMarketingSeoKeywordDto } from './dto/update-marketing-seo-keyword.dto';

@Controller('marketing-seo-keyword')
export class MarketingSeoKeywordController {
  constructor(private readonly marketingSeoKeywordService: MarketingSeoKeywordService) {}

  @Post()
  create(@Body() createMarketingSeoKeywordDto: CreateMarketingSeoKeywordDto) {
    return this.marketingSeoKeywordService.create(createMarketingSeoKeywordDto);
  }

  @Get()
  findAll() {
    return this.marketingSeoKeywordService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.marketingSeoKeywordService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketingSeoKeywordDto: UpdateMarketingSeoKeywordDto) {
    return this.marketingSeoKeywordService.update(+id, updateMarketingSeoKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingSeoKeywordService.remove(+id);
  }
}
