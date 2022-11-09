import { Module } from '@nestjs/common';
import { InterviewFeedbackService } from './interview-feedback.service';
import { InterviewFeedbackController } from './interview-feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InterviewFeedback,
  InterviewFeedbackSchema,
} from './schemas/interview-feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InterviewFeedback.name, schema: InterviewFeedbackSchema },
    ]),
  ],
  controllers: [InterviewFeedbackController],
  providers: [InterviewFeedbackService],
})
export class InterviewFeedbackModule {}
