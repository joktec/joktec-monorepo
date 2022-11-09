import { Injectable } from '@nestjs/common';
import { CreateMarketingKeywordDto } from './dto/create-marketing-keyword.dto';
import { UpdateMarketingKeywordDto } from './dto/update-marketing-keyword.dto';

@Injectable()
export class MarketingKeywordService {
  create(createMarketingKeywordDto: CreateMarketingKeywordDto) {
    return 'This action adds a new marketingKeyword';
  }

  findAll() {
    return `This action returns all marketingKeyword`;
  }

  findById(id: number) {
    return `This action returns a #${id} marketingKeyword`;
  }

  update(id: number, updateMarketingKeywordDto: UpdateMarketingKeywordDto) {
    return `This action updates a #${id} marketingKeyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketingKeyword`;
  }
}
