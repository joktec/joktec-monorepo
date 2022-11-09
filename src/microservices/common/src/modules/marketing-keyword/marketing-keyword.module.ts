import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarketingKeywordService } from './marketing-keyword.service';
import { MarketingKeywordController } from './marketing-keyword.controller';
import { MarketingKeywordSchema } from './schemas/marketing-keyword.schema';
import { NAME } from './marketing-keyword.constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NAME, schema: MarketingKeywordSchema }]),
  ],
  providers: [MarketingKeywordService],
  controllers: [MarketingKeywordController],
  exports: [MarketingKeywordService],
})

export class MarketingKeywordModule {}
