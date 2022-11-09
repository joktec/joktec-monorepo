import {
  JobhopFptoLadipageLog,
  JobhopFptoLadipageLogSchema,
} from './schemas/jobhop-fptoladipagelog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopFptoLadipageLogService } from './jobhop-fptoladipagelog.service';
import { JobhopFptoLadipageLogController } from './jobhop-fptoladipagelog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopFptoLadipageLog.name,
        schema: JobhopFptoLadipageLogSchema,
      },
    ]),
  ],
  controllers: [JobhopFptoLadipageLogController],
  providers: [JobhopFptoLadipageLogService],
})
export class JobhopFptoLadipageLogModule {}
