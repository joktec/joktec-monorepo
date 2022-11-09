import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingKeywordService } from './marketing-keyword.service';
import { CreateMarketingKeywordDto } from './dto/create-marketing-keyword.dto';
import { UpdateMarketingKeywordDto } from './dto/update-marketing-keyword.dto';

@Controller('marketing-keyword')
export class MarketingKeywordController {
  constructor(private readonly marketingKeywordService: MarketingKeywordService) {}

  @Post()
  create(@Body() createMarketingKeywordDto: CreateMarketingKeywordDto) {
    return this.marketingKeywordService.create(createMarketingKeywordDto);
  }

  @Get()
  findAll() {
    return this.marketingKeywordService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.marketingKeywordService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketingKeywordDto: UpdateMarketingKeywordDto) {
    return this.marketingKeywordService.update(+id, updateMarketingKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingKeywordService.remove(+id);
  }
}
