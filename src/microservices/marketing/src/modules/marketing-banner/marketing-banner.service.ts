import { Injectable } from '@nestjs/common';
import { CreateMarketingBannerDto } from './dto/create-marketing-banner.dto';
import { UpdateMarketingBannerDto } from './dto/update-marketing-banner.dto';

@Injectable()
export class MarketingBannerService {
  create(createMarketingBannerDto: CreateMarketingBannerDto) {
    return 'This action adds a new marketingBanner';
  }

  findAll() {
    return `This action returns all marketingBanner`;
  }

  findById(id: number) {
    return `This action returns a #${id} marketingBanner`;
  }

  update(id: number, updateMarketingBannerDto: UpdateMarketingBannerDto) {
    return `This action updates a #${id} marketingBanner`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketingBanner`;
  }
}
