import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobLinkService } from './job-link.service';
import { JobLinkController } from './job-link.controller';
import { JobLink, JobLinkSchema } from './schemas/job-link.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobLink.name,
        schema: JobLinkSchema,
      },
    ]),
  ],
  controllers: [JobLinkController],
  providers: [JobLinkService],
})
export class JobLinkModule {}
