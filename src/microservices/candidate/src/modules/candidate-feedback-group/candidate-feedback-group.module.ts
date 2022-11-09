import { Module } from '@nestjs/common';
import { CandidateFeedbackGroupService } from './candidate-feedback-group.service';
import { CandidateFeedbackGroupController } from './candidate-feedback-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateFeedbackGroup,
  CandidateFeedbackGroupSchema,
} from './schemas/candidate-feedback-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CandidateFeedbackGroup.name,
        schema: CandidateFeedbackGroupSchema,
      },
    ]),
  ],
  controllers: [CandidateFeedbackGroupController],
  providers: [CandidateFeedbackGroupService],
  exports: [CandidateFeedbackGroupService],
})
export class CandidateFeedbackGroupModule {}
