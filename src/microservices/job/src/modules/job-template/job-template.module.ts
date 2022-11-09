import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobTemplateService } from './job-template.service';
import { JobTemplateController } from './job-template.controller';
import { JobTemplate, JobTemplateSchema } from './schemas/job-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobTemplate.name,
        schema: JobTemplateSchema,
      },
    ]),
  ],
  controllers: [JobTemplateController],
  providers: [JobTemplateService],
})
export class JobTemplateModule {}
