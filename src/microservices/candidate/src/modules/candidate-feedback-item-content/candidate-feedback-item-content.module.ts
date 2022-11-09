import { Module } from '@nestjs/common';
import { CandidateFeedbackItemContentService } from './candidate-feedback-item-content.service';
import { CandidateFeedbackItemContentController } from './candidate-feedback-item-content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateFeedbackItemContent,
  CandidateFeedbackItemContentSchema,
} from './schemas/candidate-feedback-item-content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CandidateFeedbackItemContent.name,
        schema: CandidateFeedbackItemContentSchema,
      },
    ]),
  ],
  controllers: [CandidateFeedbackItemContentController],
  providers: [CandidateFeedbackItemContentService],
  exports: [CandidateFeedbackItemContentService],
})
export class CandidateFeedbackItemContentModule {}
