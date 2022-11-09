import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingSeoKeywordService } from './marketing-seo-keyword.service';
import { MarketingSeoKeywordController } from './marketing-seo-keyword.controller';
import { MarketingSeoKeywordSchema } from './schemas/marketing-seo-keyword.schema';
import { NAME } from './marketing-seo-keyword.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: MarketingSeoKeywordSchema }]),
  ],
  providers: [MarketingSeoKeywordService],
  controllers: [MarketingSeoKeywordController],
  exports: [MarketingSeoKeywordService],
})

export class MarketingSeoKeywordModule {}
