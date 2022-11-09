import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobhopNotiMessageDetailService } from './jobhop-notimessagedetail.service';
import { JobhopNotiMessageDetailController } from './jobhop-notimessagedetail.controller';
import {
  JobhopNotiMessageDetail,
  JobhopNotiMessageDetailSchema,
} from './schemas/jobhop-notimessagedetail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobhopNotiMessageDetail.name,
        schema: JobhopNotiMessageDetailSchema,
      },
    ]),
  ],
  controllers: [JobhopNotiMessageDetailController],
  providers: [JobhopNotiMessageDetailService],
})
export class JobhopNotiMessageDetailModule {}
