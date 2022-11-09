import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzActionLogController } from './quizz-action-log.controller';
import { QuizzActionLogService } from './quizz-action-log.service';
import {
  QuizzActionLog,
  QuizzActionLogSchema,
} from './schemas/quizz-action-log.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuizzActionLog.name, schema: QuizzActionLogSchema },
    ]),
  ],
  controllers: [QuizzActionLogController],
  providers: [QuizzActionLogService],
  exports: [QuizzActionLogService],
})
export class QuizzActionLogModule {}
