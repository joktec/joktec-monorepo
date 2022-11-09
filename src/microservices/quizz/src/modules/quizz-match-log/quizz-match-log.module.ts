import { Module, forwardRef } from '@nestjs/common';
import { QuizzMatchLogService } from './quizz-match-log.service';
import { QuizzMatchLogController } from './quizz-match-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QuizzMatchLog,
  QuizzMatchLogSchema,
} from './schemas/quizz-match-log.schema';
import { QuizzModule } from '../quizz/quizz.module';
import { AppModule } from '../../app.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzMatchLog.name, schema: QuizzMatchLogSchema },
    ]),
    forwardRef(() => AppModule),
    forwardRef(() => QuizzModule),
  ],
  controllers: [QuizzMatchLogController],
  providers: [QuizzMatchLogService],
  exports: [QuizzMatchLogService],
})
export class QuizzMatchLogModule {}
