import { Module } from '@nestjs/common';
import { QuizzEventService } from './quizz-event.service';
import { QuizzEventController } from './quizz-event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzEvent, QuizzEventSchema } from './schemas/quizz-event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: QuizzEvent.name,
        schema: QuizzEventSchema,
      },
    ]),
  ],
  controllers: [QuizzEventController],
  providers: [QuizzEventService],
})
export class QuizzEventModule {}
