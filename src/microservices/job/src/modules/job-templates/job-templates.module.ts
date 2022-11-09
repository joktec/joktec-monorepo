import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { JobTemplatesService } from './job-templates.service';
import { JobTemplatesController } from './job-templates.controller';
import {
  JobTemplates,
  JobTemplatesSchema,
} from './schemas/job-templates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobTemplates.name,
        schema: JobTemplatesSchema,
      },
    ]),
  ],
  controllers: [JobTemplatesController],
  providers: [JobTemplatesService],
})
export class JobTemplatesModule {}
