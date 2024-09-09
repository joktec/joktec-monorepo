import { Module } from '@joktec/core';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';

@Module({
  controllers: [EmotionController],
  providers: [EmotionService],
  exports: [EmotionService],
})
export class EmotionModule {}
