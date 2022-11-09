import { Module } from '@nestjs/common';
import { CandidateFeedbackGroupContentService } from './candidate-feedback-group-content.service';
import { CandidateFeedbackGroupContentController } from './candidate-feedback-group-content.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateFeedbackGroupContent,
  CandidateFeedbackGroupContentSchema,
} from './schemas/candidate-feedback-group-content.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CandidateFeedbackGroupContent.name,
        schema: CandidateFeedbackGroupContentSchema,
      },
    ]),
  ],
  controllers: [CandidateFeedbackGroupContentController],
  providers: [CandidateFeedbackGroupContentService],
  exports: [CandidateFeedbackGroupContentService],
})
export class CandidateFeedbackGroupContentModule {}
