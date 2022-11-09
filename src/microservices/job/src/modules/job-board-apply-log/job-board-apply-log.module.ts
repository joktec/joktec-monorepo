import {
  JobBoardApplyLog,
  JobBoardApplyLogSchema,
} from './schemas/job-board-apply-log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobBoardApplyLogService } from './job-board-apply-log.service';
import { JobBoardApplyLogController } from './job-board-apply-log.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobBoardApplyLog.name, schema: JobBoardApplyLogSchema },
    ]),
  ],
  controllers: [JobBoardApplyLogController],
  providers: [JobBoardApplyLogService],
})
export class JobBoardApplyLogModule {}
