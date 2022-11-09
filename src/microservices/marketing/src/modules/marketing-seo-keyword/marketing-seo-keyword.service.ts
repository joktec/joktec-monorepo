import { Injectable } from '@nestjs/common';
import { CreateMarketingSeoKeywordDto } from './dto/create-marketing-seo-keyword.dto';
import { UpdateMarketingSeoKeywordDto } from './dto/update-marketing-seo-keyword.dto';

@Injectable()
export class MarketingSeoKeywordService {
  create(createMarketingSeoKeywordDto: CreateMarketingSeoKeywordDto) {
    return 'This action adds a new marketingSeoKeyword';
  }

  findAll() {
    return `This action returns all marketingSeoKeyword`;
  }

  findById(id: number) {
    return `This action returns a #${id} marketingSeoKeyword`;
  }

  update(id: number, updateMarketingSeoKeywordDto: UpdateMarketingSeoKeywordDto) {
    return `This action updates a #${id} marketingSeoKeyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketingSeoKeyword`;
  }
}
