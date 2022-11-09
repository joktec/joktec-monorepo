import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobSearchQuotaService } from './job-search-quota.service';
import { JobSearchQuotaController } from './job-search-quota.controller';
import {
  JobSearchQuota,
  JobSearchQuotaSchema,
} from './schemas/job-search-quota.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobSearchQuota.name,
        schema: JobSearchQuotaSchema,
      },
    ]),
  ],
  controllers: [JobSearchQuotaController],
  providers: [JobSearchQuotaService],
})
export class JobSearchQuotaModule {}
