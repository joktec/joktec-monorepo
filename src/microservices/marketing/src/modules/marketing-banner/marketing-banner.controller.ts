import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingBannerService } from './marketing-banner.service';
import { CreateMarketingBannerDto } from './dto/create-marketing-banner.dto';
import { UpdateMarketingBannerDto } from './dto/update-marketing-banner.dto';

@Controller('marketing-banner')
export class MarketingBannerController {
  constructor(private readonly marketingBannerService: MarketingBannerService) {}

  @Post()
  create(@Body() createMarketingBannerDto: CreateMarketingBannerDto) {
    return this.marketingBannerService.create(createMarketingBannerDto);
  }

  @Get()
  findAll() {
    return this.marketingBannerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.marketingBannerService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketingBannerDto: UpdateMarketingBannerDto) {
    return this.marketingBannerService.update(+id, updateMarketingBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingBannerService.remove(+id);
  }
}
