import { JobAiLysis, JobAiLysisSchema } from './schemas/job-ai-lysis.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobAiLysisService } from './job-ai-lysis.service';
import { JobAiLysisController } from './job-ai-lysis.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobAiLysis.name, schema: JobAiLysisSchema },
    ]),
  ],
  controllers: [JobAiLysisController],
  providers: [JobAiLysisService],
})
export class JobAiLysisModule {}
