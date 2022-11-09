import { Module } from '@nestjs/common';
import { QuizzQuestionMediaService } from './quizz-question-media.service';
import { QuizzQuestionMediaController } from './quizz-question-media.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizzQuestionMedia,
  QuizzQuestionMediaSchema,
} from './schemas/quizz-question-media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzQuestionMedia.name, schema: QuizzQuestionMediaSchema },
    ]),
  ],
  controllers: [QuizzQuestionMediaController],
  providers: [QuizzQuestionMediaService],
})
export class QuizzQuestionMediaModule {}
