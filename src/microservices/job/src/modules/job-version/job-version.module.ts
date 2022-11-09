import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobVersionService } from './job-version.service';
import { JobVersionController } from './job-version.controller';
import { JobVersion, JobVersionSchema } from './schemas/job-version.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobVersion.name,
        schema: JobVersionSchema,
      },
    ]),
  ],
  controllers: [JobVersionController],
  providers: [JobVersionService],
})
export class JobVersionModule {}
