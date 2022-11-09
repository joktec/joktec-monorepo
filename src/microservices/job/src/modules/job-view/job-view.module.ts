import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobViewService } from './job-view.service';
import { JobViewController } from './job-view.controller';
import { JobView, JobViewSchema } from './schemas/job-view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobView.name,
        schema: JobViewSchema,
      },
    ]),
  ],
  controllers: [JobViewController],
  providers: [JobViewService],
})
export class JobViewModule {}
