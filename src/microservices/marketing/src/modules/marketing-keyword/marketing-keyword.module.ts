import {
  MarketingKeyword,
  MarketingKeywordSchema,
} from './schemas/marketing-keyword.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MarketingKeywordService } from './marketing-keyword.service';
import { MarketingKeywordController } from './marketing-keyword.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketingKeyword.name,
        schema: MarketingKeywordSchema,
      },
    ]),
  ],
  controllers: [MarketingKeywordController],
  providers: [MarketingKeywordService],
})
export class MarketingKeywordModule {}
