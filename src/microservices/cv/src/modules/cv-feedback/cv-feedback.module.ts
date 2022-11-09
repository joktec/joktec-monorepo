import { Module } from '@nestjs/common';
import { CvFeedbackService } from './cv-feedback.service';
import { CvFeedbackController } from './cv-feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CvFeedback,
  CvFeedbackSchema,
} from './schemas/cv-feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CvFeedback.name, schema: CvFeedbackSchema },
    ]),
  ],
  controllers: [CvFeedbackController],
  providers: [CvFeedbackService]
})
export class CvFeedbackModule {}
