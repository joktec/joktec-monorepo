import { Injectable } from '@nestjs/common';
import { CreateMarketInsightJobTitleDto } from './dto/create-market-insight-job-title.dto';
import { UpdateMarketInsightJobTitleDto } from './dto/update-market-insight-job-title.dto';

@Injectable()
export class MarketInsightJobTitleService {
  create(createMarketInsightJobTitleDto: CreateMarketInsightJobTitleDto) {
    return 'This action adds a new marketInsightJobTitle';
  }

  findAll() {
    return `This action returns all marketInsightJobTitle`;
  }

  findById(id: number) {
    return `This action returns a #${id} marketInsightJobTitle`;
  }

  update(id: number, updateMarketInsightJobTitleDto: UpdateMarketInsightJobTitleDto) {
    return `This action updates a #${id} marketInsightJobTitle`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketInsightJobTitle`;
  }
}
