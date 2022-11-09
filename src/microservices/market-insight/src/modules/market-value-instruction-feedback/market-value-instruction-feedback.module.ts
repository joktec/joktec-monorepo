import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MarketValueInstructionFeedbackService } from './market-value-instruction-feedback.service';
import { MarketValueInstructionFeedbackController } from './market-value-instruction-feedback.controller';
import {
  MarketValueInstructionFeedback,
  MarketValueInstructionFeedbackSchema,
} from './schemas/market-value-instruction-feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MarketValueInstructionFeedback.name,
        schema: MarketValueInstructionFeedbackSchema,
      },
    ]),
  ],
  controllers: [MarketValueInstructionFeedbackController],
  providers: [MarketValueInstructionFeedbackService],
})
export class MarketValueInstructionFeedbackModule {}
