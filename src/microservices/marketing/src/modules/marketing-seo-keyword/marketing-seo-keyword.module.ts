import {
  MarketingSeoKeyword,
  MarketingSeoKeywordSchema,
} from './schemas/marketing-seo-keyword.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MarketingSeoKeywordService } from './marketing-seo-keyword.service';
import { MarketingSeoKeywordController } from './marketing-seo-keyword.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketingSeoKeyword.name,
        schema: MarketingSeoKeywordSchema,
      },
    ]),
  ],
  controllers: [MarketingSeoKeywordController],
  providers: [MarketingSeoKeywordService],
})
export class MarketingSeoKeywordModule {}
