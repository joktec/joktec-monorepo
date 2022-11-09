import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerCrawlerDto } from './create-jobseeker_crawler.dto';

export class UpdateJobseekerCrawlerDto extends PartialType(CreateJobseekerCrawlerDto) {}
