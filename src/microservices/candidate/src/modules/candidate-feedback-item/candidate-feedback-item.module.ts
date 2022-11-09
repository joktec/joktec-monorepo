import { Module } from '@nestjs/common';
import { CandidateFeedbackItemService } from './candidate-feedback-item.service';
import { CandidateFeedbackItemController } from './candidate-feedback-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CandidateFeedbackItem,
  CandidateFeedbackItemSchema,
} from './schemas/candidate-feedback-item.schema';
import { CandidateFeedbackItemContentModule } from '../candidate-feedback-item-content/candidate-feedback-item-content.module';
import { CandidateFeedbackGroupModule } from '../candidate-feedback-group/candidate-feedback-group.module';
import { CandidateFeedbackGroupContentModule } from '../candidate-feedback-group-content/candidate-feedback-group-content.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CandidateFeedbackItem.name, schema: CandidateFeedbackItemSchema },
    ]),
    CandidateFeedbackItemContentModule,
    CandidateFeedbackGroupModule,
    CandidateFeedbackGroupContentModule,
  ],
  controllers: [CandidateFeedbackItemController],
  providers: [CandidateFeedbackItemService],
})
export class CandidateFeedbackItemModule {}
