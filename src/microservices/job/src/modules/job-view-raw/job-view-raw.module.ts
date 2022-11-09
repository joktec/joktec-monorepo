import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobViewRawService } from './job-view-raw.service';
import { JobViewRawController } from './job-view-raw.controller';
import { JobViewRaw, JobViewRawSchema } from './schemas/job-view-raw.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobViewRaw.name,
        schema: JobViewRawSchema,
      },
    ]),
  ],
  controllers: [JobViewRawController],
  providers: [JobViewRawService],
})
export class JobViewRawModule {}
