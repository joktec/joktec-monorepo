import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { Keyword, KeywordSchema } from './schemas/keyword.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }]),
  ],
  providers: [KeywordService],
  controllers: [KeywordController],
  exports: [KeywordService],
})
export class KeywordModule {}
