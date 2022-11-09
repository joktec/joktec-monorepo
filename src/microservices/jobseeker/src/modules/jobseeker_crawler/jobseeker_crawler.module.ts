import { Module } from '@nestjs/common';
import { JobseekerCrawlerService } from './jobseeker_crawler.service';
import { JobseekerCrawlerController } from './jobseeker_crawler.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  JobseekerCrawler,
  JobseekerCrawlerSchema,
} from './schemas/jobseeker_crawler.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobseekerCrawler.name, schema: JobseekerCrawlerSchema },
    ]),
  ],
  controllers: [JobseekerCrawlerController],
  providers: [JobseekerCrawlerService]
})
export class JobseekerCrawlerModule {}
