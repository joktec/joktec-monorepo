import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobSearchService } from './job-search.service';
import { JobSearchController } from './job-search.controller';
import { JobSearch, JobSearchSchema } from './schemas/job-search.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobSearch.name,
        schema: JobSearchSchema,
      },
    ]),
  ],
  controllers: [JobSearchController],
  providers: [JobSearchService],
})
export class JobSearchModule {}
