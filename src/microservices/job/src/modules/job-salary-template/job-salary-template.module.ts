import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobSalaryTemplateService } from './job-salary-template.service';
import { JobSalaryTemplateController } from './job-salary-template.controller';
import {
  JobSalaryTemplate,
  JobSalaryTemplateSchema,
} from './schemas/job-salary-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobSalaryTemplate.name,
        schema: JobSalaryTemplateSchema,
      },
    ]),
  ],
  controllers: [JobSalaryTemplateController],
  providers: [JobSalaryTemplateService],
})
export class JobSalaryTemplateModule {}
